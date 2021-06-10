jest.mock('../../shared/utils.js');
jest.mock('../../shared/mappers/stringMappers.js');

const { formatToMoney, formatToMileage } = require('../../shared/mappers/stringMappers.js');
const sut = require('./calculateTop.js');

describe('#calculateTop', () => {

  const someMockPrice = 'some mock price';
  const someMockMileage = 'some mock mileage';
  let input;
  let outputEntriesNovember;
  let outputEntriesOctober;
  const getReportForMonth = (entries) => expect.objectContaining({
    captions: ['Ranking', 'Listing Id', 'Make', 'Selling Price', 'Mileage', 'Total amount of contacts'],
    entries: expect.arrayContaining(entries)
  });

  beforeEach(() => {
    jest.resetAllMocks();

    input = [[
      { id: 1, price: 123, make: 'audi', mileage: '200' },
      { id: 2, price: 432, make: 'bmw', mileage: '123' },
    ], [
      { listing_id: 1, contact_date: +new Date(2020, 10) },
      { listing_id: 1, contact_date: +new Date(2020, 10) },
      { listing_id: 1, contact_date: +new Date(2020, 10) },
      { listing_id: 2, contact_date: +new Date(2020, 10) },
      { listing_id: 2, contact_date: +new Date(2020, 9) },
    ]];

    outputEntriesNovember = [
      [expect.any(Number), '2', 'bmw', someMockPrice, someMockMileage, 1],
      [expect.any(Number), '1', 'audi', someMockPrice, someMockMileage, 3],
    ];

    outputEntriesOctober = [
      [expect.any(Number), '2', 'bmw', someMockPrice, someMockMileage, 1],
    ];


    formatToMoney.mockReturnValue(someMockPrice);
    formatToMileage.mockReturnValue(someMockMileage);
  });

  test('return valid report', () => {
    const result = sut(input);
    expect(result).toEqual(expect.objectContaining({
      '10.2020': getReportForMonth(outputEntriesOctober),
      '11.2020': getReportForMonth(outputEntriesNovember),
    }));
    expect(formatToMoney).toHaveBeenCalledTimes(3);
    expect(formatToMileage).toHaveBeenCalledTimes(3);
  });

  test('can be limited by other N', () => {
    const topN = 1;
    const result = sut(input, topN);

    expect(result).toEqual(expect.objectContaining({
      '10.2020': getReportForMonth(outputEntriesOctober),
      '11.2020': getReportForMonth(outputEntriesNovember.slice(1)),
    }));
    expect(formatToMoney).toHaveBeenCalledTimes(2);
    expect(formatToMileage).toHaveBeenCalledTimes(2);
  });

});
