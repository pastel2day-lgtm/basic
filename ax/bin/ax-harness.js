#!/usr/bin/env node

import { runAXHarness } from '../src/harness/index.ts';

const args = process.argv.slice(2);
const command = args[0] || 'verify';

runAXHarness(command, process.cwd()).catch((err) => {
  console.error('❌ AX Harness Execution Error:', err);
  process.exit(1);
});
