#!/usr/bin/env node
import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function setup() {
  console.log('\n🌱 Harvest MCP Server Setup\n');

  // Get Harvest credentials
  console.log('First, we need your Harvest credentials.');
  console.log('You can find these at: https://id.getharvest.com/developers\n');
  
  const token = await question('Personal Access Token: ');
  const accountId = await question('Account ID: ');
  
  // Get work day configuration
  console.log('\nNow, let\'s configure your work day settings.\n');
  
  const hours = await question('Standard work day hours (default: 7.5): ');
  const timezone = await question('Timezone (default: Australia/Perth): ');

  // Create configuration
  const config = {
    mcpServers: {
      "harvest-server": {
        command: "npx",
        args: ["harvest-mcp-server"],
        env: {
          HARVEST_ACCESS_TOKEN: token,
          HARVEST_ACCOUNT_ID: accountId,
          STANDARD_WORK_DAY_HOURS: hours || '7.5',
          TIMEZONE: timezone || 'Australia/Perth'
        },
        disabled: false,
        autoApprove: []
      }
    }
  };

  // Determine Claude config paths
  const desktopConfigPath = path.join(os.homedir(), 'Library/Application Support/Claude/claude_desktop_config.json');
  const vscodeConfigPath = path.join(os.homedir(), 'Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json');

  // Update Claude desktop config
  try {
    let existingConfig = {};
    if (fs.existsSync(desktopConfigPath)) {
      existingConfig = JSON.parse(fs.readFileSync(desktopConfigPath, 'utf8'));
    }
    
    const newConfig = {
      ...existingConfig,
      mcpServers: {
        ...(existingConfig as any).mcpServers,
        ...config.mcpServers
      }
    };

    fs.writeFileSync(desktopConfigPath, JSON.stringify(newConfig, null, 2));
    console.log('\n✅ Claude desktop app configured successfully');
  } catch (error) {
    console.log('\n⚠️ Could not configure Claude desktop app');
    console.log('You may need to add this configuration manually to:');
    console.log(desktopConfigPath);
    console.log('\nConfiguration to add:');
    console.log(JSON.stringify(config, null, 2));
  }

  // Update VSCode config if it exists
  try {
    if (fs.existsSync(vscodeConfigPath)) {
      let existingConfig = JSON.parse(fs.readFileSync(vscodeConfigPath, 'utf8'));
      const newConfig = {
        ...existingConfig,
        mcpServers: {
          ...(existingConfig as any).mcpServers,
          ...config.mcpServers
        }
      };
      fs.writeFileSync(vscodeConfigPath, JSON.stringify(newConfig, null, 2));
      console.log('✅ VSCode extension configured successfully');
    }
  } catch (error) {
    // VSCode config is optional, so we don't show an error
  }

  console.log('\n🎉 Setup complete!');
  console.log('\nPlease:');
  console.log('1. Restart the Claude desktop app');
  console.log('2. Try a test command like: "Show time report for this week"\n');

  rl.close();
}

setup().catch(console.error);
