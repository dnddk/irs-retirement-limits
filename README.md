# IRS Retirement Account Limits

Contribution limits and Roth IRA income phase-out ranges by year,
with the IRS Notice cited for each year.

This is a third-party compilation of public IRS figures. It is not published or
endorsed by the IRS. If a figure here disagrees with the IRS, the IRS is right.

## Coverage
2019–2026 · IRA and Roth IRA only (not 401k/403b)

## 2026
| | Under 50 | Age 50+ |
|---|---:|---:|
| IRA contribution limit | $7,500 | $8,600 |

Roth IRA MAGI phase-out (2026):
Single / HoH $153,000–$168,000 · MFJ $242,000–$252,000 · MFS $0–$10,000

Source: [IRS Notice 2025-67](https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500)

## All years
| Year | IRA limit | Age 50+ limit | Single / HoH phase-out | MFJ phase-out | MFS phase-out | Source |
|---|---:|---:|---|---|---|---|
| 2019 | $6,000 | $7,000 | $122,000–$137,000 | $193,000–$203,000 | $0–$10,000 | [IRS Notice 2018-83](https://www.irs.gov/newsroom/401k-contribution-limit-increases-to-19000-for-2019-ira-limit-increases-to-6000) |
| 2020 | $6,000 | $7,000 | $124,000–$139,000 | $196,000–$206,000 | $0–$10,000 | [IRS Notice 2019-59](https://www.irs.gov/newsroom/401k-contribution-limit-increases-to-19500-for-2020-catch-up-limit-rises-to-6500) |
| 2021 | $6,000 | $7,000 | $125,000–$140,000 | $198,000–$208,000 | $0–$10,000 | [IRS Notice 2020-79](https://www.irs.gov/pub/irs-drop/n-20-79.pdf) |
| 2022 | $6,000 | $7,000 | $129,000–$144,000 | $204,000–$214,000 | $0–$10,000 | [IRS Notice 2021-61](https://www.irs.gov/newsroom/irs-announces-401k-limit-increases-to-20500) |
| 2023 | $6,500 | $7,500 | $138,000–$153,000 | $218,000–$228,000 | $0–$10,000 | [IRS Notice 2022-55](https://www.irs.gov/newsroom/401k-limit-increases-to-22500-for-2023-ira-limit-rises-to-6500) |
| 2024 | $7,000 | $8,000 | $146,000–$161,000 | $230,000–$240,000 | $0–$10,000 | [IRS Notice 2023-75](https://www.irs.gov/newsroom/401k-limit-increases-to-23000-for-2024-ira-limit-rises-to-7000) |
| 2025 | $7,000 | $8,000 | $150,000–$165,000 | $236,000–$246,000 | $0–$10,000 | [IRS Notice 2024-80](https://www.irs.gov/newsroom/401k-limit-increases-to-23500-for-2025-ira-limit-remains-7000) |
| 2026 | $7,500 | $8,600 | $153,000–$168,000 | $242,000–$252,000 | $0–$10,000 | [IRS Notice 2025-67](https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500) |

## How the reduced contribution limit is calculated

The IRS method is Pub 590-A Worksheet 2-2: scale the contribution limit by the
percentage of the phase-out range remaining, **round the result up to the nearest
$10, and enter $200 for any result between $0 and $200**.

Note: the age-50 catch-up is included in the base the reduction is applied to, so a
50+ filer in the middle of the range is reduced from the age-50+ limit (for example
$8,600 in 2026), not from $7,500.

## Data format
`limits.json` — machine-readable, one object per year. Amounts are whole US dollars;
phase-out ranges are `[lower, upper]` MAGI. Every entry carries a `source` field
(the IRS Notice) and `sourceUrl`. Entries with `source: null` still need a citation (see TODO).

## Related
An interactive calculator built on this dataset: https://rothiratools.com/

## License
MIT for the compilation and scripts. The underlying figures are published by the IRS
and are public information.
