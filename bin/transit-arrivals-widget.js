#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getConfig } from '../lib/file-utils.js';
import { formatError } from '../lib/log-utils.js';
import transitArrivalsWidget from '../index.js';

const { argv } = yargs(hideBin(process.argv))
  .usage('Usage: $0 --config ./config.json')
  .help()
  .option('c', {
    alias: 'configPath',
    describe: 'Path to config file',
    default: './config.json',
    type: 'string',
  })
  .option('s', {
    alias: 'skipImport',
    describe: 'Don’t import GTFS file.',
    type: 'boolean',
  })
  .default('skipImport', undefined);

const handleError = (error) => {
  const text = error || 'Unknown Error';
  process.stdout.write(`\n${formatError(text)}\n`);
  console.error(error);
  process.exit(1);
};

const setupImport = async () => {
  const config = await getConfig(argv);
  await transitArrivalsWidget(config);
  process.exit();
};

setupImport().catch(handleError);
