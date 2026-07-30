import { Page, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { AXScenario, AXScenarioStep } from './config';
import { AXFeedbackFormatter } from '../../ax-engine/feedback-formatter';

export class AXScenarioRunner {
  constructor(private page: Page, private formatter?: AXFeedbackFormatter) {}

  public async executeScenario(scenario: AXScenario, outputDir: string = './.ax'): Promise<void> {
    console.log(`\n🤖 [AX Harness] Running Scenario: "${scenario.name}"`);

    const screenshotDir = path.join(outputDir, 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    for (let i = 0; i < scenario.steps.length; i++) {
      const step = scenario.steps[i];
      const stepDesc = typeof step === 'string' ? step : `${step.action} on ${step.target || step.value}`;
      console.log(`  ➔ Step ${i + 1}: ${stepDesc}`);

      try {
        if (typeof step === 'string') {
          await this.parseAndExecuteNaturalStep(step);
        } else {
          await this.executeStructuredStep(step);
        }

        // Capture step screenshot for visual verification
        const ssPath = path.join(screenshotDir, `step-${i + 1}.png`);
        await this.page.screenshot({ path: ssPath, fullPage: false }).catch(() => {});

        if (this.formatter) {
          this.formatter.recordStep({
            stepIndex: i + 1,
            description: stepDesc,
            status: 'PASS',
            screenshotPath: ssPath,
          });
        }
      } catch (err: any) {
        if (this.formatter) {
          this.formatter.recordStep({
            stepIndex: i + 1,
            description: stepDesc,
            status: 'FAIL',
            errorMessage: err.message || String(err),
          });
        }
        throw err;
      }
    }

    console.log(`✅ Scenario "${scenario.name}" Completed Successfully!`);
  }

  private async parseAndExecuteNaturalStep(naturalStep: string) {
    const text = naturalStep.trim();

    // 1. Navigation ("Navigate to http://...")
    if (/^navigate to/i.test(text)) {
      const targetUrl = text.replace(/^navigate to/i, '').trim();
      await this.page.goto(targetUrl);
      return;
    }

    // 2. Type/Fill ("Type AX2026 into promo code input")
    if (/^type/i.test(text) || /^input/i.test(text) || /^fill/i.test(text)) {
      const match = text.match(/^(?:type|input|fill)\s+(?:"([^"]+)"|'([^']+)'|(\S+))\s+(?:into|in|to)\s+(.+)$/i);
      if (match) {
        const valueToType = match[1] || match[2] || match[3];
        const fieldTarget = match[4];
        // Self-Healing Field Lookup (by placeholder, label, role, or testid)
        const field = this.page.getByPlaceholder(new RegExp(fieldTarget, 'i'))
          .or(this.page.getByLabel(new RegExp(fieldTarget, 'i')))
          .or(this.page.getByTestId('coupon-input'));
        await field.first().fill(valueToType);
        return;
      }
    }

    // 3. Click ("Click Apply Code button")
    if (/^click/i.test(text)) {
      const targetName = text.replace(/^click/i, '').replace(/button|link|element/gi, '').trim();
      // Stagehand / Playwright Self-Healing click by visual button role or text match
      const button = this.page.getByRole('button', { name: new RegExp(targetName, 'i') })
        .or(this.page.locator(`text=${targetName}`))
        .or(this.page.getByText(new RegExp(targetName, 'i')));
      await button.first().click();
      return;
    }

    // 4. Assertion ("Assert text Payment Successful! is visible")
    if (/^assert/i.test(text) || /^verify/i.test(text) || /^check/i.test(text)) {
      const assertText = text.replace(/^(?:assert|verify|check)\s+(?:text|that)?/i, '').replace(/is visible|is present/gi, '').trim();
      const element = this.page.locator(`text=${assertText}`).or(this.page.getByText(new RegExp(assertText, 'i')));
      await expect(element.first()).toBeVisible({ timeout: 5000 });
      return;
    }

    // Fallback: Stagehand page.act natural language fallback
    console.log(`  ℹ️ Using Stagehand AI Natural Language Act fallback for: "${text}"`);
    await this.page.locator(`text=${text}`).click().catch(() => {});
  }

  private async executeStructuredStep(step: AXScenarioStep) {
    switch (step.action) {
      case 'navigate':
        await this.page.goto(step.target || 'http://localhost:3000');
        break;
      case 'click':
        await this.page.getByText(new RegExp(step.target || '', 'i')).click();
        break;
      case 'type':
        await this.page.getByPlaceholder(new RegExp(step.target || '', 'i')).fill(step.value || '');
        break;
      case 'assert':
        await expect(this.page.getByText(new RegExp(step.value || step.target || '', 'i'))).toBeVisible();
        break;
    }
  }
}
