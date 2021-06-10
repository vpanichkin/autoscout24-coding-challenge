const { formatToMoney, formatToMileage } = require('../../shared/mappers/stringMappers.js');

function calculateTop(files, topN) {
  const [listings, contacts] = files;
  const mostContactedByMonth = getMostContactedByMonth(contacts);
  const topNContacted = getTopNContacted(mostContactedByMonth, topN);

  return Object.entries(topNContacted)
    .reduce((accumulator, [month, contactsDuringMonth]) => {
      accumulator[month] = fillReport(mapToListingDictionary(listings), contactsDuringMonth);
      return accumulator;
    }, {});
}

function getMostContactedByMonth(contacts) {
  const contactsByMonth = {};

  for (const { contact_date, listing_id } of contacts) {
    const contactDate = new Date(parseInt(contact_date));
    const month = `${`${(contactDate.getMonth() + 1)}`.padStart(2, '0')}.${contactDate.getFullYear()}`;
    if (contactsByMonth[month]) {
      contactsByMonth[month][listing_id] ? contactsByMonth[month][listing_id] += 1 : contactsByMonth[month][listing_id] = 1;
    } else {
      contactsByMonth[month] = {
        [listing_id]: 1
      };
    }
  }
  return contactsByMonth;
}

function getTopNContacted(mostContactedByMonth, topN = 5) {
  const topByMonth = {};
  Object.entries(mostContactedByMonth).forEach(([month, monthsEntries]) => {
    topByMonth[month] = Object.entries(monthsEntries)
      .sort((contactA, contactB) => contactB[1] - contactA[1])
      .slice(0, topN);
  });
  return topByMonth;
}

function mapToListingDictionary(listing) {
  return listing.reduce((accumulator, { id, ...rest }) => {
    accumulator[id] = rest;
    return accumulator;
  }, {});
}

function fillReport(listings, contactsDuringMonth) {
  const report = {
    captions: ['Ranking', 'Listing Id', 'Make', 'Selling Price', 'Mileage', 'Total amount of contacts'],
    entries: []
  };
  for (let i = 0; i < contactsDuringMonth.length; i++) {
    const [id, totalContactsAmount] = contactsDuringMonth[i];
    const { make, price, mileage } = listings[id];
    const entry = [i + 1, id, make, formatToMoney(price), formatToMileage(mileage), totalContactsAmount];
    report.entries.push(entry);
  }
  return report;
}


module.exports = calculateTop;
