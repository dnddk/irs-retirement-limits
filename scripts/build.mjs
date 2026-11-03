// Regenerates limits.json and README.md from the source table (src/data/limits.ts in the
// rothiratools.com site repo). Numbers are never typed here: both files come from that table.
//
//   node --experimental-strip-types --no-warnings scripts/build.mjs <path/to/limits.ts> [outDir]
//
// Only years whose figures are all published are exported. If the exported data is unchanged,
// nothing is written. When files change, the suggested commit message goes to stdout.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const [src, outDir = '.'] = process.argv.slice(2);
if (!src) {
  console.error('usage: build.mjs <path/to/limits.ts> [outDir]');
  process.exit(2);
}

const { LIMITS, announcedIn } = await import(pathToFileURL(resolve(src)).href);

const years = Object.keys(LIMITS)
  .map(Number)
  .filter((y) => announcedIn(LIMITS, y))
  .sort((a, b) => a - b)
  .map((y) => {
    const l = LIMITS[y];
    const range = (r) => [r.lower, r.upper];
    return {
      year: y,
      iraContributionLimit: l.base.under50,
      iraContributionLimitAge50Plus: l.base.age50plus,
      rothPhaseOut: {
        single: range(l.phaseOut.single),
        headOfHousehold: range(l.phaseOut.hoh),
        marriedFilingJointly: range(l.phaseOut.marriedJoint),
        marriedFilingSeparately: range(l.phaseOut.marriedSeparate),
      },
      source: l.sourceNotice,
      sourceUrl: l.sourceUrl,
      announcedOn: l.announcedOn,
    };
  });

if (!years.length) throw new Error('No published years found in ' + src);

const jsonPath = join(outDir, 'limits.json');
const prev = existsSync(jsonPath) ? JSON.parse(readFileSync(jsonPath, 'utf8')) : null;
if (prev && JSON.stringify(prev.years) === JSON.stringify(years)) process.exit(0);

const first = years[0].year;
const last = years.at(-1).year;
const today = new Date().toISOString().slice(0, 10);

const data = {
  meta: {
    title: 'IRS Retirement Account Limits',
    coverage: `${first}-${last}`,
    lastUpdated: today,
    notes:
      'Figures are for US IRA and Roth IRA only. Amounts are whole US dollars. rothPhaseOut is the Roth IRA MAGI range [lower, upper]. source is the IRS Notice for that year, or null where no citation has been recorded yet.',
    license: 'MIT',
  },
  years,
};
writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n');

const usd = (n) => '$' + n.toLocaleString('en-US');
const span = ([a, b]) => `${usd(a)}–${usd(b)}`;
const cite = (y) => (y.source ? `IRS ${y.source}` : 'TODO: source');

const latest = years.at(-1);
const p = latest.rothPhaseOut;
const missing = years.filter((y) => !y.source).map((y) => y.year);

const readme = `# IRS Retirement Account Limits

Contribution limits and Roth IRA income phase-out ranges by year,
with the IRS Notice cited for each year.

This is a third-party compilation of public IRS figures. It is not published or
endorsed by the IRS. If a figure here disagrees with the IRS, the IRS is right.

## Coverage
${first}–${last} · IRA and Roth IRA only (not 401k/403b)

## ${latest.year}
| | Under 50 | Age 50+ |
|---|---:|---:|
| IRA contribution limit | ${usd(latest.iraContributionLimit)} | ${usd(latest.iraContributionLimitAge50Plus)} |

Roth IRA MAGI phase-out (${latest.year}):
Single / HoH ${span(p.single)} · MFJ ${span(p.marriedFilingJointly)} · MFS ${span(p.marriedFilingSeparately)}

Source: ${latest.sourceUrl ? `[${cite(latest)}](${latest.sourceUrl})` : cite(latest)}

## All years
| Year | IRA limit | Age 50+ limit | Single / HoH phase-out | MFJ phase-out | MFS phase-out | Source |
|---|---:|---:|---|---|---|---|
${years
  .map(
    (y) =>
      `| ${y.year} | ${usd(y.iraContributionLimit)} | ${usd(y.iraContributionLimitAge50Plus)} | ${span(y.rothPhaseOut.single)} | ${span(y.rothPhaseOut.marriedFilingJointly)} | ${span(y.rothPhaseOut.marriedFilingSeparately)} | ${y.sourceUrl ? `[${cite(y)}](${y.sourceUrl})` : cite(y)} |`,
  )
  .join('\n')}
${missing.length ? `\nTODO: source — ${missing.join(', ')} ${missing.length > 1 ? 'have' : 'has'} no IRS Notice recorded yet.\n` : ''}
## How the reduced contribution limit is calculated

The IRS method is Pub 590-A Worksheet 2-2: scale the contribution limit by the
percentage of the phase-out range remaining, **round the result up to the nearest
$10, and enter $200 for any result between $0 and $200**.

Note: the age-50 catch-up is included in the base the reduction is applied to, so a
50+ filer in the middle of the range is reduced from the age-50+ limit (for example
${usd(latest.iraContributionLimitAge50Plus)} in ${latest.year}), not from ${usd(latest.iraContributionLimit)}.

## Data format
\`limits.json\` — machine-readable, one object per year. Amounts are whole US dollars;
phase-out ranges are \`[lower, upper]\` MAGI. Every entry carries a \`source\` field
(the IRS Notice) and \`sourceUrl\`. Entries with \`source: null\` still need a citation (see TODO).

## Related
An interactive calculator built on this dataset: https://rothiratools.com/

## License
MIT for the compilation and scripts. The underlying figures are published by the IRS
and are public information.
`;
writeFileSync(join(outDir, 'README.md'), readme);

const prevYears = new Set((prev?.years ?? []).map((y) => y.year));
const added = years.filter((y) => !prevYears.has(y.year));
console.log(
  added.length === 1 && prev
    ? `Add ${added[0].year} IRS limits (${added[0].source ?? 'source TODO'})`
    : prev
      ? 'Update IRS limits data'
      : 'Add IRS IRA and Roth IRA limits dataset with Notice sources',
);
