import { execSync } from 'child_process';
import { AXFeedbackFormatter } from './feedback-formatter';

async function runAXVerificationLoop() {
  console.log('\n🚀 Starting AI-to-AI Verification AX Orchestrator...\n');
  const formatter = new AXFeedbackFormatter();

  // 1. Run Unit Tests (Vitest)
  console.log('📦 [1/2] Executing Vitest Logic Verification...');
  try {
    const vitestOutput = execSync('npx vitest run --reporter=verbose', { encoding: 'utf-8', stdio: 'pipe' });
    console.log('✅ Unit Tests Passed Cleanly!');
  } catch (error: any) {
    console.error('❌ Unit Tests Failed!');
    formatter.addFailure({
      suite: 'Vitest',
      testName: 'Cart Business Logic Suite',
      errorMessage: error.message || 'Vitest execution failed',
      stackTrace: error.stdout || error.stderr || String(error),
      timestamp: new Date().toISOString(),
    });
  }

  // 2. Run Stagehand / Playwright E2E Verification
  console.log('\n🌐 [2/2] Executing Stagehand / Vision AI E2E Suite...');
  try {
    const playwrightOutput = execSync('npx playwright test tests/e2e/stagehand-self-healing.spec.ts', { encoding: 'utf-8', stdio: 'pipe' });
    console.log('✅ E2E & Stagehand AI Self-Healing Verification Passed!');
  } catch (error: any) {
    console.error('❌ E2E Tests Failed!');
    formatter.addFailure({
      suite: 'Stagehand',
      testName: 'Stagehand Self-Healing E2E Suite',
      errorMessage: error.message || 'E2E test failed',
      stackTrace: error.stdout || error.stderr || String(error),
      timestamp: new Date().toISOString(),
    });
  }

  // 3. Generate Structured Diagnostics Report
  console.log('\n📊 Generating AX AI Diagnostics & Self-Healing Report...');
  const { jsonPath, promptPath } = formatter.generateReport();

  console.log(`\n✨ AX Verification Run Completed!`);
  console.log(`📄 Machine-readable report: ${jsonPath}`);
  console.log(`📝 LLM Auto-Repair Prompt: ${promptPath}\n`);
}

runAXVerificationLoop().catch((err) => {
  console.error('Fatal AX Orchestrator Error:', err);
});
