#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import * as chrono from 'chrono-node';

// Time report response types
interface TimeReportResult {
  client_id?: number;
  client_name?: string;
  project_id?: number;
  project_name?: string;
  task_id?: number;
  task_name?: string;
  user_id?: number;
  user_name?: string;
  weekly_capacity?: number;
  avatar_url?: string;
  is_contractor?: boolean;
  total_hours: number;
  billable_hours: number;
  currency: string;
  billable_amount: number;
}

interface TimeReportResponse {
  results: TimeReportResult[];
  per_page: number;
  total_pages: number;
  total_entries: number;
  next_page: number | null;
  previous_page: number | null;
  page: number;
}

const HARVEST_ACCESS_TOKEN = process.env.HARVEST_ACCESS_TOKEN;
const HARVEST_ACCOUNT_ID = process.env.HARVEST_ACCOUNT_ID;
const STANDARD_WORK_DAY_HOURS = parseFloat(process.env.STANDARD_WORK_DAY_HOURS || '7.5');
const TIMEZONE = process.env.TIMEZONE || 'Australia/Perth';

if (!HARVEST_ACCESS_TOKEN || !HARVEST_ACCOUNT_ID) {
  throw new Error('HARVEST_ACCESS_TOKEN and HARVEST_ACCOUNT_ID environment variables are required');
}

// Special patterns for leave requests
const LEAVE_PATTERNS = {
  sick: {
    triggers: ['sick', 'ill', 'unwell'],
    project: '[LV] Leave',
    task: "Person (Sick/Carer's) Leave",
  },
  annual: {
    triggers: ['annual leave', 'vacation', 'holiday', 'time off'],
    project: '[LV] Leave',
    task: 'Annual Leave',
  }
};

class HarvestServer {
  private server: Server;
  private axiosInstance;

  constructor() {
    this.server = new Server(
      {
        name: 'harvest-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.axiosInstance = axios.create({
      baseURL: 'https://api.harvestapp.com/v2',
      headers: {
        'Authorization': `Bearer ${HARVEST_ACCESS_TOKEN}`,
        'Harvest-Account-Id': HARVEST_ACCOUNT_ID,
        'User-Agent': 'Harvest MCP Server (cline@example.com)',
      },
    });

    this.setupToolHandlers();
    
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private isLeaveRequest(text: string): { isLeave: boolean; type?: keyof typeof LEAVE_PATTERNS } {
    const lowercaseText = text.toLowerCase();
    for (const [type, pattern] of Object.entries(LEAVE_PATTERNS)) {
      if (pattern.triggers.some(trigger => lowercaseText.includes(trigger))) {
        return { isLeave: true, type: type as keyof typeof LEAVE_PATTERNS };
      }
    }
    return { isLeave: false };
  }

  private parseDateRange(text: string): { from: string; to: string } {
    const lowercaseText = text.toLowerCase();
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: TIMEZONE }));
    
    // Handle common time ranges
    if (lowercaseText.includes('last month')) {
      const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const to = new Date(now.getFullYear(), now.getMonth(), 0);
      return {
        from: from.toISOString().split('T')[0],
        to: to.toISOString().split('T')[0]
      };
    }
    
    if (lowercaseText.includes('this month')) {
      const from = new Date(now.getFullYear(), now.getMonth(), 1);
      const to = now;
      return {
        from: from.toISOString().split('T')[0],
        to: to.toISOString().split('T')[0]
      };
    }
    
    if (lowercaseText.includes('this week')) {
      const from = new Date(now);
      from.setDate(now.getDate() - now.getDay());
      return {
        from: from.toISOString().split('T')[0],
        to: now.toISOString().split('T')[0]
      };
    }

    if (lowercaseText.includes('last week')) {
      const from = new Date(now);
      from.setDate(now.getDate() - now.getDay() - 7);
      const to = new Date(from);
      to.setDate(from.getDate() + 6);
      return {
        from: from.toISOString().split('T')[0],
        to: to.toISOString().split('T')[0]
      };
    }

    // Default to parsing with chrono
    const dates = chrono.parse(text);
    if (dates.length === 0) {
      throw new McpError(ErrorCode.InvalidParams, 'Could not parse date range from input');
    }

    return {
      from: dates[0].start.date().toISOString().split('T')[0],
      to: (dates[0].end?.date() || dates[0].start.date()).toISOString().split('T')[0]
    };
  }

  private async parseTimeEntry(text: string) {
    const lowercaseText = text.toLowerCase();
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: TIMEZONE }));
    
    // Check if this is a leave request
    const leaveCheck = this.isLeaveRequest(text);
    if (leaveCheck.isLeave && leaveCheck.type) {
      // For leave requests, use the full work day
      return {
        spent_date: now.toISOString().split('T')[0],
        hours: STANDARD_WORK_DAY_HOURS,
        isLeave: true,
        leaveType: leaveCheck.type
      };
    }

    // For regular time entries
    let date: Date;
    if (lowercaseText.includes('today')) {
      date = now;
    } else {
      const parsed = chrono.parseDate(text);
      if (!parsed) {
        throw new McpError(ErrorCode.InvalidParams, 'Could not parse date from input');
      }
      date = parsed;
    }

    // Extract hours/minutes
    const durationMatch = text.match(/(\d+)\s*(hour|hr|h|minute|min|m)s?/i);
    if (!durationMatch) {
      throw new McpError(ErrorCode.InvalidParams, 'Could not parse duration from input');
    }

    const amount = parseInt(durationMatch[1]);
    const unit = durationMatch[2].toLowerCase();
    const hours = unit.startsWith('h') ? amount : amount / 60;

    return {
      spent_date: date.toISOString().split('T')[0],
      hours,
      isLeave: false
    };
  }

  private async findProject(text: string, isLeave: boolean = false, leaveType?: keyof typeof LEAVE_PATTERNS): Promise<number> {
    const response = await this.axiosInstance.get('/users/me/project_assignments');
    const projectAssignments = response.data.project_assignments;
    
    if (isLeave && leaveType) {
      // For leave requests, look for the specific leave project
      const leaveProject = projectAssignments.find((pa: { project: { name: string; id: number } }) => 
        pa.project.name === LEAVE_PATTERNS[leaveType].project
      );
      if (leaveProject) {
        return leaveProject.project.id;
      }
    }
    
    // For regular entries or if leave project not found
    const projectMatch = projectAssignments.find((pa: { project: { name: string; id: number } }) => 
      text.toLowerCase().includes(pa.project.name.toLowerCase())
    );

    if (!projectMatch) {
      throw new McpError(ErrorCode.InvalidParams, 'Could not find matching project');
    }

    return projectMatch.project.id;
  }

  private async findTask(projectId: number, text: string, isLeave: boolean = false, leaveType?: keyof typeof LEAVE_PATTERNS): Promise<number> {
    const response = await this.axiosInstance.get(`/projects/${projectId}/task_assignments`);
    const tasks = response.data.task_assignments;

    if (isLeave && leaveType) {
      // For leave requests, look for the specific leave task
      const leaveTask = tasks.find((t: { task: { name: string; id: number } }) => 
        t.task.name === LEAVE_PATTERNS[leaveType].task
      );
      if (leaveTask) {
        return leaveTask.task.id;
      }
    }

    // For regular entries or if leave task not found
    const taskMatch = tasks.find((t: { task: { name: string; id: number } }) => 
      text.toLowerCase().includes(t.task.name.toLowerCase())
    );

    if (!taskMatch) {
      // Default to first task if no match found
      return tasks[0].task.id;
    }

    return taskMatch.task.id;
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'log_time',
          description: 'Log time entry using natural language',
          inputSchema: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
                description: 'Natural language time entry (e.g. "2 hours on Project X doing development work yesterday")',
              },
            },
            required: ['text'],
          },
        },
        {
          name: 'list_projects',
          description: 'List available Harvest projects',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'list_tasks',
          description: 'List available tasks for a project',
          inputSchema: {
            type: 'object',
            properties: {
              project_id: {
                type: 'number',
                description: 'Project ID',
              },
            },
            required: ['project_id'],
          },
        },
        {
          name: 'list_entries',
          description: 'List recent time entries',
          inputSchema: {
            type: 'object',
            properties: {
              from: {
                type: 'string',
                description: 'Start date (YYYY-MM-DD)',
              },
              to: {
                type: 'string',
                description: 'End date (YYYY-MM-DD)',
              },
            },
          },
        },
        {
          name: 'get_time_report',
          description: 'Get time reports using natural language',
          inputSchema: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
                description: 'Natural language query (e.g., "Show time report for last month", "Get time summary for Project X")',
              },
            },
            required: ['text'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'log_time': {
          const { text } = request.params.arguments as { text: string };
          
          try {
            // Parse time entry details
            const { spent_date, hours, isLeave, leaveType } = await this.parseTimeEntry(text);
            
            // Find matching project
            const project_id = await this.findProject(text, isLeave, leaveType);
            
            // Find matching task
            const task_id = await this.findTask(project_id, text, isLeave, leaveType);
            
            // Create time entry
            const response = await this.axiosInstance.post('/time_entries', {
              project_id,
              task_id,
              spent_date,
              hours,
              notes: text,
            });

            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(response.data, null, 2),
                },
              ],
            };
          } catch (error) {
            if (error instanceof McpError) {
              throw error;
            }
            if (axios.isAxiosError(error)) {
              throw new McpError(
                ErrorCode.InternalError,
                `Harvest API error: ${error.response?.data?.message ?? error.message}`
              );
            }
            throw error;
          }
        }

        case 'list_projects': {
          const response = await this.axiosInstance.get('/users/me/project_assignments');
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(response.data.project_assignments.map((pa: { project: { id: number; name: string; code: string }; is_active: boolean }) => ({
                  id: pa.project.id,
                  name: pa.project.name,
                  code: pa.project.code,
                  is_active: pa.is_active,
                })), null, 2),
              },
            ],
          };
        }

        case 'list_tasks': {
          const { project_id } = request.params.arguments as { project_id: number };
          const response = await this.axiosInstance.get(`/projects/${project_id}/task_assignments`);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(response.data.task_assignments.map((t: { task: { id: number; name: string } }) => ({
                  id: t.task.id,
                  name: t.task.name,
                })), null, 2),
              },
            ],
          };
        }

        case 'list_entries': {
          const { from, to } = request.params.arguments as { from?: string; to?: string };
          const params: Record<string, string> = {};
          if (from) params.from = from;
          if (to) params.to = to;
          
          const response = await this.axiosInstance.get('/time_entries', { params });
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(response.data.time_entries.map((e: { id: number; spent_date: string; hours: number; notes: string; project: { name: string }; task: { name: string } }) => ({
                  id: e.id,
                  spent_date: e.spent_date,
                  hours: e.hours,
                  notes: e.notes,
                  project: e.project.name,
                  task: e.task.name,
                })), null, 2),
              },
            ],
          };
        }

        case 'get_time_report': {
          const { text } = request.params.arguments as { text: string };
          
          try {
            const { from, to } = this.parseDateRange(text);
            const lowercaseText = text.toLowerCase();
            
            let endpoint = '/reports/time/projects'; // default to project report
            
            if (lowercaseText.includes('by client') || lowercaseText.includes('for client')) {
              endpoint = '/reports/time/clients';
            } else if (lowercaseText.includes('by task') || lowercaseText.includes('tasks')) {
              endpoint = '/reports/time/tasks';
            } else if (lowercaseText.includes('by team') || lowercaseText.includes('by user')) {
              endpoint = '/reports/time/team';
            }
            
            const response = await this.axiosInstance.get<TimeReportResponse>(endpoint, {
              params: { from, to }
            });

            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(response.data, null, 2),
                },
              ],
            };
          } catch (error) {
            if (error instanceof McpError) {
              throw error;
            }
            if (axios.isAxiosError(error)) {
              throw new McpError(
                ErrorCode.InternalError,
                `Harvest API error: ${error.response?.data?.message ?? error.message}`
              );
            }
            throw error;
          }
        }

        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Harvest MCP server running on stdio');
  }
}

const server = new HarvestServer();
server.run().catch(console.error);
