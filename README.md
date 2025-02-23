# Harvest Natural Language Time Entry MCP Server

An MCP server that lets you log Harvest time entries using natural language, including special handling for leave requests. This server makes time tracking more intuitive by understanding natural language inputs and automatically handling common scenarios like leave requests.

## Features

- 🗣️ Natural language time entry parsing
- 🏖️ Special leave request handling (e.g., "I'm off sick today")
- ⏰ Configurable work day hours
- 🌍 Timezone support
- 🎯 Automatic project and task matching
- 📅 Smart date parsing (today, yesterday, etc.)

## Prerequisites

- Node.js installed
- A Harvest account
- Personal access token from [Harvest Developer Tools](https://id.getharvest.com/developers)
- Account ID (shown on the same page as your token)

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/harvest-mcp-server.git
cd harvest-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the server:
```bash
npm run build
```

4. Configure in your Claude settings file:

For VSCode (`~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`):
```json
{
  "mcpServers": {
    "harvest": {
      "command": "node",
      "args": ["/path/to/harvest-server/build/index.js"],
      "env": {
        "HARVEST_ACCESS_TOKEN": "your-token",
        "HARVEST_ACCOUNT_ID": "your-account-id",
        "STANDARD_WORK_DAY_HOURS": "7.5",
        "TIMEZONE": "Australia/Perth"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

For Claude desktop app (`~/Library/Application Support/Claude/claude_desktop_config.json`), use the same configuration.

## Usage

The server provides several tools for interacting with Harvest:

### log_time
Log time entries using natural language. Examples:

Regular time entries:
```
"2 hours on Project X doing development work today"
"45 minutes on Project Y testing yesterday"
"3.5 hours on Project Z meetings last Friday"
```

Leave requests (automatically uses standard work day hours):
```
"I'm off sick today"
"I'm unwell today"
```

### list_projects
List all available Harvest projects:
```
List my projects
```

### list_tasks
List available tasks for a specific project:
```
Show tasks for Project X
```

### list_entries
View recent time entries:
```
Show my recent time entries
```

## Configuration

The server supports these environment variables:

- `HARVEST_ACCESS_TOKEN`: Your Harvest personal access token
- `HARVEST_ACCOUNT_ID`: Your Harvest account ID
- `STANDARD_WORK_DAY_HOURS`: Default hours for a full work day (default: 7.5)
- `TIMEZONE`: Your timezone (default: Australia/Perth)

## Development

The server is built using:
- TypeScript
- MCP SDK
- chrono-node for natural language date parsing
- Harvest API v2

To contribute:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details
