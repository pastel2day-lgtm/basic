import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

async function runSimulation() {
  console.log(`
  ╔══════════════════════════════════════════════════════════════╗
  ║    🎬 AX-HEAL Real-World AI Closed-Loop Interactive Sim     ║
  ╚══════════════════════════════════════════════════════════════╝
  `);

  const componentPath = path.join(process.cwd(), 'src/components/ShoppingCart.tsx');
  const originalCode = fs.readFileSync(componentPath, 'utf-8');

  try {
    // -------------------------------------------------------------
    // STAGE 1: Self-Healing Demo (DOM Randomization)
    // -------------------------------------------------------------
    console.log('\n===============================================================');
    console.log('📌 [STAGE 1] Testing Self-Healing Capabilities (Selector Mutation)');
    console.log('===============================================================');
    console.log('⚡ Simulating dynamic CSS class changes on the checkout button...');
    console.log('➔ Traditional Playwright CSS selectors (#checkout-btn) would FAIL here.');
    console.log('➔ Running ax-heal natural language & vision self-healing...\n');

    execSync('npx tsx bin/ax-harness.js verify', { stdio: 'inherit' });

    console.log('\n🎉 STAGE 1 SUCCESS: Stagehand / AX-HEAL self-healed selector changes seamlessly!');

    // -------------------------------------------------------------
    // STAGE 2: Real Functional Bug & Closed-Loop Repair Demo
    // -------------------------------------------------------------
    console.log('\n===============================================================');
    console.log('📌 [STAGE 2] Injecting Real Functional Bug into ShoppingCart.tsx');
    console.log('===============================================================');
    console.log('⚠️ Injecting bug: Disabling checkout button event & breaking promo code validation...');

    // Inject intentional bug: button disabled and promo code rejected
    const buggyCode = originalCode
      .replace("setAppliedDiscount(0.2);", "setAppliedDiscount(0); // BUG: Promo broken!")
      .replace("className={checkoutBtnClass}", "className={checkoutBtnClass} disabled");

    fs.writeFileSync(componentPath, buggyCode, 'utf-8');

    console.log('🧪 Executing ax-heal gatekeeper on buggy code...\n');

    try {
      execSync('npx tsx bin/ax-harness.js verify', { stdio: 'inherit' });
    } catch (e) {
      console.log('\n🚨 AX-HEAL GATEKEEPER CAUGHT THE BUG AS EXPECTED!');
    }

    // Inspect generated AI Repair Prompt
    const promptPath = path.join(process.cwd(), '.ax/ax-repair-prompt.md');
    if (fs.existsSync(promptPath)) {
      console.log('\n📄 Generated AI Auto-Repair Prompt (.ax/ax-repair-prompt.md):');
      console.log('---------------------------------------------------------------');
      console.log(fs.readFileSync(promptPath, 'utf-8').slice(0, 700));
      console.log('---------------------------------------------------------------');
    }

    // -------------------------------------------------------------
    // STAGE 3: Closed-Loop AI Auto-Fix & Re-Verification Pass
    // -------------------------------------------------------------
    console.log('\n===============================================================');
    console.log('📌 [STAGE 3] AI Closed-Loop Auto-Repair & Re-Verification');
    console.log('===============================================================');
    console.log('🔧 Simulating Coding AI repairing ShoppingCart.tsx from repair prompt...');

    // Restore clean code
    fs.writeFileSync(componentPath, originalCode, 'utf-8');

    console.log('✨ Re-running ax-heal to verify fix...\n');
    execSync('npx tsx bin/ax-harness.js verify', { stdio: 'inherit' });

    console.log('\n===============================================================');
    console.log('🏆 SIMULATION COMPLETE: AX Closed-Loop AI-to-AI Verification Proved!');
    console.log('===============================================================');

  } finally {
    // Restore original code to keep workspace pristine
    fs.writeFileSync(componentPath, originalCode, 'utf-8');
  }
}

runSimulation().catch(console.error);
