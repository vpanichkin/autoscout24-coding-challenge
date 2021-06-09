const { getAverage } = require('../../shared/utils.js');

function calculateAverage(files) {
  const [listingFile] = files;
  const pricesBySellerTypes = listingFile.reduce((accumulator, { price, seller_type }) => {
    accumulator[seller_type] ? accumulator[seller_type].push(price) : accumulator[seller_type] = [price];
    return accumulator;
  }, {});

  const averagePerType = {
    captions: ['Seller Type', 'Average in Euro'],
    entries: []
  };
  Object.entries(pricesBySellerTypes).forEach(([seller_type, prices]) => {
    averagePerType.entries.push([seller_type, getAverage(prices)]);
  });
  return averagePerType;
}

module.exports = calculateAverage;
