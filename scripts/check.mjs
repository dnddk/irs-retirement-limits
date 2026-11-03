// Checks that every number in README.md's "All years" table matches limits.json.
//   node scripts/check.mjs [dir]

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2] ?? '.';
const { years } = JSON.parse(readFileSync(join(dir, 'limits.json'), 'utf8'));
const readme = readFileSync(join(dir, 'README.md'), 'utf8');

const table = readme.split('## All years')[1].split('\n## ')[0];
const rows = table.split('\n').filter((l) => /^\| \d{4} \|/.test(l));
const nums = (s) => (s.match(/\$[\d,]+/g) ?? []).map((n) => Number(n.replace(/[$,]/g, '')));

let errors = 0;
if (rows.length !== years.length) {
  console.error(`README has ${rows.length} year rows, limits.json has ${years.length}`);
  errors++;
}
for (const y of years) {
  const row = rows.find((r) => r.startsWith(`| ${y.year} |`));
  if (!row) {
    console.error(`${y.year}: missing from README`);
    errors++;
    continue;
  }
  const p = y.rothPhaseOut;
  const want = [y.iraContributionLimit, y.iraContributionLimitAge50Plus, ...p.single, ...p.marriedFilingJointly, ...p.marriedFilingSeparately];
  const got = nums(row);
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    console.error(`${y.year}: README ${got} != limits.json ${want}`);
    errors++;
  }
  if (y.source && !row.includes(y.source)) {
    console.error(`${y.year}: README source does not include ${y.source}`);
    errors++;
  }
}
if (errors) process.exit(1);
console.log(`OK: ${years.length} years, every README table number matches limits.json`);
