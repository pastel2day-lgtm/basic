import fs from 'fs';
import path from 'path';
import { AXHarnessConfig, AXScenario } from './config';

export function scanProjectAndGenerateConfig(cwd: string = process.cwd()): AXHarnessConfig {
  console.log('🔍 [AX Scanner] Analyzing codebase structure and UI elements...');

  const srcDir = path.join(cwd, 'src');
  const appDir = path.join(cwd, 'app');
  const targetDir = fs.existsSync(srcDir) ? srcDir : fs.existsSync(appDir) ? appDir : cwd;

  const discoveredButtons: string[] = [];
  const discoveredInputs: string[] = [];
  const discoveredTexts: string[] = [];

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (!file.startsWith('.') && file !== 'node_modules') {
          walk(fullPath);
        }
      } else if (/\.(tsx|jsx|html|ts|js)$/.test(file)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        // Scan for buttons
        const buttonMatches = content.match(/<button[^>]*>(.*?)<\/button>/gi) || [];
        buttonMatches.forEach((btn) => {
          const cleanText = btn.replace(/<[^>]+>/g, '').trim();
          if (cleanText && !discoveredButtons.includes(cleanText) && cleanText.length < 30) {
            discoveredButtons.push(cleanText);
          }
        });

        // Scan for inputs/placeholders
        const placeholderMatches = content.match(/placeholder=["']([^"']+)["']/gi) || [];
        placeholderMatches.forEach((ph) => {
          const cleanPh = ph.replace(/placeholder=["']/gi, '').replace(/["']$/g, '').trim();
          if (cleanPh && !discoveredInputs.includes(cleanPh)) {
            discoveredInputs.push(cleanPh);
          }
        });
      }
    }
  }

  walk(targetDir);

  console.log(`💡 Discovered ${discoveredButtons.length} interactive buttons & ${discoveredInputs.length} input fields.`);

  // Auto-build AI Scenarios
  const autoSteps: string[] = ['Navigate to http://localhost:3000'];

  if (discoveredInputs.length > 0) {
    autoSteps.push(`Type TEST_CODE into ${discoveredInputs[0]}`);
  }

  if (discoveredButtons.length > 0) {
    // Pick first interactive button (e.g. Apply Code or Submit)
    autoSteps.push(`Click ${discoveredButtons[0]} button`);
  }

  if (discoveredButtons.length > 1) {
    // Pick checkout/pay button
    const actionBtn = discoveredButtons.find((b) => /pay|order|checkout|submit|complete/i.test(b)) || discoveredButtons[1];
    autoSteps.push(`Click ${actionBtn} button`);
  }

  autoSteps.push('Assert text Payment Successful! is visible');

  const generatedScenario: AXScenario = {
    name: 'Auto-Scanned AI User Journey',
    steps: autoSteps,
  };

  const config: AXHarnessConfig = {
    projectName: path.basename(cwd),
    baseURL: 'http://localhost:3000',
    devCommand: 'npm run dev',
    aiProvider: 'stagehand',
    outputDir: './.ax',
    scenarios: [generatedScenario],
  };

  const configPath = path.join(cwd, 'ax.config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
  console.log(`✨ Auto-generated ax.config.json successfully based on AI scanner!`);

  return config;
}
