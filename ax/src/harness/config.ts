import fs from 'fs';
import path from 'path';

export interface AXScenarioStep {
  action: 'navigate' | 'click' | 'type' | 'assert' | 'extract';
  target?: string; // Natural language target or URL path
  value?: string;  // Text to type or expected text
}

export interface AXScenario {
  name: string;
  steps: (string | AXScenarioStep)[];
}

export interface AXHarnessConfig {
  projectName?: string;
  baseURL: string;
  devCommand?: string;
  scenarios: AXScenario[];
  aiProvider?: 'stagehand' | 'vision' | 'mock';
  outputDir?: string;
}

export const DEFAULT_CONFIG: AXHarnessConfig = {
  projectName: 'My Target Web App',
  baseURL: 'http://localhost:3000',
  devCommand: 'npm run dev',
  aiProvider: 'stagehand',
  outputDir: './.ax',
  scenarios: [
    {
      name: 'Standard Shopping & Checkout Scenario',
      steps: [
        'Navigate to http://localhost:3000',
        'Type AX2026 into promo code input',
        'Click Apply Code button',
        'Assert text Promo applied! is visible',
        'Click Complete Order & Pay button',
        'Assert text Payment Successful! is visible',
      ],
    },
  ],
};

export function loadHarnessConfig(cwd: string = process.cwd()): AXHarnessConfig {
  const configPath = path.join(cwd, 'ax.config.json');
  if (!fs.existsSync(configPath)) {
    console.log('ℹ️  No ax.config.json found. Creating default configuration...');
    fs.writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8');
    return DEFAULT_CONFIG;
  }

  try {
    const raw = fs.readFileSync(configPath, 'utf-8');
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch (err) {
    console.warn('⚠️ Failed to parse ax.config.json, falling back to defaults:', err);
    return DEFAULT_CONFIG;
  }
}
