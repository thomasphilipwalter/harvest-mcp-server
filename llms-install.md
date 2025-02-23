# AI Installation Guide for Harvest MCP Server

This guide provides specific instructions for AI agents like Claude to help users install and configure the Harvest MCP server.

## Installation Steps

1. Dependencies:
   - Verify Node.js is installed by running `node --version`
   - If not installed, guide user to download from https://nodejs.org

2. Repository Setup:
   ```bash
   git clone https://github.com/yourusername/harvest-mcp-server.git
   cd harvest-mcp-server
   npm install
   npm run build
   ```

3. Harvest Credentials:
   - Direct user to https://id.getharvest.com/developers
   - Help them locate:
     - Personal Access Token (under "Create New Personal Access Token")
     - Account ID (shown at top of page)

4. Configuration:
   - For VSCode users:
     - Path: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
   - For Claude desktop app users:
     - Path: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Configuration template:
     ```json
     {
       "mcpServers": {
         "harvest": {
           "command": "node",
           "args": ["ABSOLUTE_PATH/build/index.js"],
           "env": {
             "HARVEST_ACCESS_TOKEN": "user's-token",
             "HARVEST_ACCOUNT_ID": "user's-account-id",
             "STANDARD_WORK_DAY_HOURS": "7.5",
             "TIMEZONE": "Australia/Perth"
           },
           "disabled": false,
           "autoApprove": []
         }
       }
     }
     ```

## Verification Steps

1. Check server builds successfully:
   ```bash
   npm run build
   ```

2. Verify configuration:
   - Ensure all environment variables are set
   - Confirm file paths are absolute
   - Check timezone matches user's location

3. Test basic functionality:
   - List projects: `List my projects`
   - Simple time entry: `2 hours on Project X today`
   - Leave request: `I'm off sick today`

## Troubleshooting

Common issues and solutions:

1. "HARVEST_ACCESS_TOKEN and HARVEST_ACCOUNT_ID environment variables are required"
   - Verify credentials are correctly set in configuration
   - Check for typos in token and account ID

2. "Could not find matching project"
   - List available projects first
   - Ensure project name matches exactly

3. Server not starting
   - Verify absolute path in configuration
   - Check Node.js is installed
   - Ensure build completed successfully

## Configuration Options

Help users customize their installation:

1. Work Day Hours:
   - Default: 7.5
   - Can be changed via STANDARD_WORK_DAY_HOURS

2. Timezone:
   - Default: Australia/Perth
   - Use IANA timezone names
   - Example alternatives:
     - America/New_York
     - Europe/London
     - Asia/Tokyo

3. Leave Types:
   - Default: Sick/Carer's Leave
   - Matches "[LV] Leave" project
   - Triggered by keywords: "sick", "ill", "unwell"
