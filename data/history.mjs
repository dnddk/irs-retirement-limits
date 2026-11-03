// Years and citations not carried by the site's limits table, each checked against the IRS
// news release and the IRS Notice for that year. Same shape as the site's YearLimits.
// A year here that the site also has may only fill citation fields left null there.

export const HISTORY = {
  2019: {
    year: 2019,
    announcedOn: '2018-11-01', // IR-2018-211
    sourceNotice: 'Notice 2018-83',
    sourceUrl: 'https://www.irs.gov/newsroom/401k-contribution-limit-increases-to-19000-for-2019-ira-limit-increases-to-6000',
    base: { under50: 6000, age50plus: 7000 },
    phaseOut: {
      single: { lower: 122000, upper: 137000 },
      hoh: { lower: 122000, upper: 137000 },
      marriedJoint: { lower: 193000, upper: 203000 },
      marriedSeparate: { lower: 0, upper: 10000 },
    },
  },
  2020: {
    year: 2020,
    announcedOn: '2019-11-06', // IR-2019-179
    sourceNotice: 'Notice 2019-59',
    sourceUrl: 'https://www.irs.gov/newsroom/401k-contribution-limit-increases-to-19500-for-2020-catch-up-limit-rises-to-6500',
    base: { under50: 6000, age50plus: 7000 },
    phaseOut: {
      single: { lower: 124000, upper: 139000 },
      hoh: { lower: 124000, upper: 139000 },
      marriedJoint: { lower: 196000, upper: 206000 },
      marriedSeparate: { lower: 0, upper: 10000 },
    },
  },
  2021: {
    year: 2021,
    announcedOn: null, // IR-2020-244 news release is no longer on irs.gov; figures from the Notice
    sourceNotice: 'Notice 2020-79',
    sourceUrl: 'https://www.irs.gov/pub/irs-drop/n-20-79.pdf',
    base: { under50: 6000, age50plus: 7000 },
    phaseOut: {
      single: { lower: 125000, upper: 140000 },
      hoh: { lower: 125000, upper: 140000 },
      marriedJoint: { lower: 198000, upper: 208000 },
      marriedSeparate: { lower: 0, upper: 10000 },
    },
  },
  2022: {
    year: 2022,
    announcedOn: '2021-11-04', // IR-2021-216
    sourceNotice: 'Notice 2021-61',
    sourceUrl: 'https://www.irs.gov/newsroom/irs-announces-401k-limit-increases-to-20500',
    base: { under50: 6000, age50plus: 7000 },
    phaseOut: {
      single: { lower: 129000, upper: 144000 },
      hoh: { lower: 129000, upper: 144000 },
      marriedJoint: { lower: 204000, upper: 214000 },
      marriedSeparate: { lower: 0, upper: 10000 },
    },
  },
  2023: {
    year: 2023,
    announcedOn: '2022-10-21', // IR-2022-188
    sourceNotice: 'Notice 2022-55',
    sourceUrl: 'https://www.irs.gov/newsroom/401k-limit-increases-to-22500-for-2023-ira-limit-rises-to-6500',
    base: { under50: 6500, age50plus: 7500 },
    phaseOut: {
      single: { lower: 138000, upper: 153000 },
      hoh: { lower: 138000, upper: 153000 },
      marriedJoint: { lower: 218000, upper: 228000 },
      marriedSeparate: { lower: 0, upper: 10000 },
    },
  },
  // Figures are on the site; this only adds the citation.
  2024: {
    year: 2024,
    announcedOn: '2023-11-01', // IR-2023-203
    sourceNotice: 'Notice 2023-75',
    sourceUrl: 'https://www.irs.gov/newsroom/401k-limit-increases-to-23000-for-2024-ira-limit-rises-to-7000',
  },
};
