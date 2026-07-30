import fs from 'fs';
import path from 'path';

export interface AXTestFailure {
  suite: 'Vitest' | 'Playwright' | 'Stagehand';
  testName: string;
  errorMessage: string;
  stackTrace: string;
  domSnapshot?: string;
  timestamp: string;
}

export class AXFeedbackFormatter {
  private failures: AXTestFailure[] = [];

  public addFailure(failure: AXTestFailure) {
    this.failures.push(failure);
  }

  public generateReport(outputDir: string = './.ax'): { jsonPath: string; promptPath: string } {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const jsonPath = path.join(outputDir, 'ax-feedback.json');
    const promptPath = path.join(outputDir, 'ax-repair-prompt.md');

    const reportData = {
      timestamp: new Date().toISOString(),
      totalFailures: this.failures.length,
      failures: this.failures,
      status: this.failures.length === 0 ? 'PASS' : 'FAIL',
    };

    fs.writeFileSync(jsonPath, JSON.stringify(reportData, null, 2), 'utf-8');

    // Generate LLM-ready Repair Prompt
    let promptContent = `# 🤖 AX (AI Verification) Auto-Repair Instructions\n\n`;
    promptContent += `The AI-to-AI Verification Loop detected **${this.failures.length}** test failure(s).\n`;
    promptContent += `Please review the structured diagnostics below and modify the target source code to fix the underlying defect.\n\n`;

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
    promptContent += `Fix the source code in \`src/\` to satisfy all assertions, then re-run \`npm run ax:verify\` to validate the loop.\n`;

    fs.writeFileSync(promptPath, promptContent, 'utf-8');

    return { jsonPath, promptPath };
  }
}
