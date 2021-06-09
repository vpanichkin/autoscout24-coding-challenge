const { formatToMoney } = require('../../shared/mappers/stringMappers.js');
const { getAverage } = require('../../shared/utils.js');

function calculateAverageByPercent(files, percent) {
  const [listing, contacts] = files;
  const mostPopular = getMostPopular(contacts, percent);
  const listingPrice = prepareListingPrice(listing);
  const joinedPrices = joinMostPopularWithPrice(mostPopular, listingPrice);

  return {
    captions: ['Average Price'],
    entries: [[formatToMoney(getAverage(joinedPrices))]]
  };
}

function getMostPopular(contacts, thresholdPercent = 30) {
  const contactedTotalById = {};
  for (const { listing_id } of contacts) {
    contactedTotalById[listing_id] ? contactedTotalById[listing_id] += 1 : contactedTotalById[listing_id] = 1;
  }
  const contactedTotalEntries = Object.entries(contactedTotalById);
  return contactedTotalEntries
    .sort((listingA, listingB) => listingB[1] - listingA[1])
    .slice(0, Math.ceil(thresholdPercent / 100 * contactedTotalEntries.length));
}

function prepareListingPrice(listing) {
  return listing.reduce((accumulator, { id, price }) => {
    accumulator[id] = price;
    return accumulator;
  }, {});
}

function joinMostPopularWithPrice(mostPopular, listingPrice) {
  return mostPopular.map(([listingId]) => listingPrice[listingId]);
}

module.exports = calculateAverageByPercent;
