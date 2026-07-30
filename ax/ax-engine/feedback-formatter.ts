import fs from 'fs';
import path from 'path';

export interface AXTestStepResult {
  stepIndex: number;
  description: string;
  status: 'PASS' | 'FAIL';
  screenshotPath?: string;
  errorMessage?: string;
}

export interface AXTestFailure {
  suite: 'Vitest' | 'Playwright' | 'Stagehand';
  testName: string;
  errorMessage: string;
  stackTrace: string;
  domSnapshot?: string;
  timestamp: string;
  stepResults?: AXTestStepResult[];
}

export class AXFeedbackFormatter {
  private failures: AXTestFailure[] = [];
  private stepResults: AXTestStepResult[] = [];

  public addFailure(failure: AXTestFailure) {
    this.failures.push(failure);
  }

  public recordStep(step: AXTestStepResult) {
    this.stepResults.push(step);
  }

  public generateReport(outputDir: string = './.ax'): { jsonPath: string; promptPath: string; htmlPath: string } {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const jsonPath = path.join(outputDir, 'ax-feedback.json');
    const promptPath = path.join(outputDir, 'ax-repair-prompt.md');
    const htmlPath = path.join(outputDir, 'report.html');

    const reportData = {
      timestamp: new Date().toISOString(),
      totalFailures: this.failures.length,
      failures: this.failures,
      steps: this.stepResults,
      status: this.failures.length === 0 ? 'PASS' : 'FAIL',
    };

    fs.writeFileSync(jsonPath, JSON.stringify(reportData, null, 2), 'utf-8');

    // 1. Generate LLM Auto-Repair Prompt Markdown
    let promptContent = `# 🩹 AX-HEAL (AI Verification) Auto-Repair Prompt\n\n`;
    if (this.failures.length === 0) {
      promptContent += `✅ **All AX Scenarios Passed Cleanly! No code repairs required.**\n`;
    } else {
      promptContent += `The AI-to-AI Verification Loop detected **${this.failures.length}** test failure(s).\n`;
      promptContent += `Please review the structured diagnostics below and modify target source code in \`src/\` to fix defects.\n\n`;

      this.failures.forEach((f, idx) => {
        promptContent += `### Issue ${idx + 1}: [${f.suite}] ${f.testName}\n`;
        promptContent += `**Error Message:** \`${f.errorMessage}\`  \n\n`;
        promptContent += `**Stack Trace:**\n\`\`\`text\n${f.stackTrace.slice(0, 1000)}\n\`\`\`\n\n`;
        if (f.domSnapshot) {
          promptContent += `**DOM Context Snippet:**\n\`\`\`html\n${f.domSnapshot.slice(0, 800)}\n\`\`\`\n\n`;
        }
        promptContent += `---\n\n`;
      });

      promptContent += `## 🎯 Required Action\n`;
      promptContent += `Fix source code files in \`src/\` to resolve these errors, then re-run \`npx ax-heal\` to verify.\n`;
    }

    fs.writeFileSync(promptPath, promptContent, 'utf-8');

    // 2. Generate Interactive HTML Visual Dashboard Report
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>🩹 AX-HEAL Verification Dashboard</title>
  <style>
    body { font-family: 'Inter', system-ui, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
    .header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid #334155; }
    .status-badge { padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; }
    .status-PASS { background: #059669; color: #ecfdf5; }
    .status-FAIL { background: #dc2626; color: #fef2f2; }
    .card { background: #1e293b; border-radius: 12px; padding: 20px; margin-top: 20px; border: 1px solid #334155; }
    .step-list { display: flex; flex-direction: column; gap: 12px; margin-top: 12px; }
    .step-item { display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #0f172a; border-radius: 8px; }
    code { background: #0f172a; padding: 12px; border-radius: 6px; display: block; font-family: monospace; color: #38bdf8; overflow-x: auto; white-space: pre-wrap; }
    .copy-btn { background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }
    .copy-btn:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🩹 AX-HEAL Verification Dashboard</h1>
    <span class="status-badge status-${reportData.status}">${reportData.status}</span>
  </div>

  <div class="card">
    <h2>📊 Summary</h2>
    <p>Timestamp: <strong>${reportData.timestamp}</strong></p>
    <p>Total Failures: <strong>${reportData.totalFailures}</strong></p>
  </div>

  ${
    this.failures.length > 0
      ? `<div class="card">
          <h2>🚨 AI Repair Prompt (Copy & Paste to Cursor / Claude)</h2>
          <button class="copy-btn" onclick="navigator.clipboard.writeText(document.getElementById('prompt-text').innerText)">📋 Copy Repair Prompt</button>
          <pre id="prompt-text"><code>${promptContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        </div>`
      : ''
  }

  <div class="card">
    <h2>🧪 Step Execution Log</h2>
    <div class="step-list">
      ${this.stepResults
        .map(
          (s) => `
        <div class="step-item">
          <div>
            <strong>Step ${s.stepIndex}:</strong> ${s.description}
          </div>
          <span class="status-badge status-${s.status}">${s.status}</span>
        </div>
      `
        )
        .join('')}
    </div>
  </div>
</body>
</html>`;

    fs.writeFileSync(htmlPath, htmlContent, 'utf-8');

    return { jsonPath, promptPath, htmlPath };
  }
}
