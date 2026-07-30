#!/usr/bin/env node

import { runAXHarness } from '../src/harness/index.ts';

const args = process.argv.slice(2);
const isWatch = args.includes('--watch') || args.includes('-w');
const command = args.find((a) => !a.startsWith('-')) || 'verify';

runAXHarness(command, process.cwd(), isWatch).catch((err) => {
  console.error('❌ AX Harness Execution Error:', err);
  process.exit(1);
});
