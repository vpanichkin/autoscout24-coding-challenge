const { getShare } = require('../../shared/utils.js');

function calculateDistribution(files) {
  const [listingFile] = files;
  const carsTotalPerMake = listingFile.reduce((accumulator, { make }) => {
    accumulator[make] ? accumulator[make] += 1 : accumulator[make] = 1;
    return accumulator;
  }, {});

  const distribution = {
    captions: ['Make', 'Distribution'],
    entries: []
  };
  Object.entries(carsTotalPerMake).forEach(([make, itemsPerMake]) => {
    distribution.entries.push([make, `${getShare(itemsPerMake, listingFile.length)}%`]);
  });
  return distribution;
}

module.exports = calculateDistribution;
