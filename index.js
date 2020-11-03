#!/usr/bin/env node
const DiffPrompt = require('./src/cmd/DiffPrompt');

const localDirectory = process.env.LOCAL_DIRECTORY || process.cwd();

DiffPrompt.run(localDirectory);
