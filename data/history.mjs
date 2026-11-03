// Years and citations not carried by the site's limits table, each checked against the IRS
// news release and the IRS Notice for that year. Same shape as the site's YearLimits.
// A year here that the site also has may only fill citation fields left null there.

export const HISTORY = {
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
