jest.mock('../../shared/utils.js');
jest.mock('../../shared/mappers/stringMappers.js');


const { getAverage } = require('../../shared/utils.js');
const { formatToMoney } = require('../../shared/mappers/stringMappers.js');
const sut = require('./calculateAverage30.js');

describe('#calculateAverage30', () => {

  const someMockAverage = 'some mock average';
  const someMockFormat = 'someMockFormat';
  let input;

  beforeEach(() => {
    jest.resetAllMocks();

    input = [[
      { id: 1, price: 123 },
      { id: 2, price: 583 },
      { id: 3, price: 237 }
    ], [
      { listing_id: 1 },
      { listing_id: 1 },
      { listing_id: 1 },
      { listing_id: 2 },
      { listing_id: 2 },
      { listing_id: 3 },
    ]];

    getAverage.mockReturnValue(someMockAverage);
    formatToMoney.mockReturnValue(someMockFormat);
  });

  test('return valid report', () => {
    const result = sut(input);

    expect(result).toEqual(expect.objectContaining({
      captions: ['Average Price'],
      entries: [[someMockFormat]]
    }));
    expect(getAverage).toHaveBeenCalledWith([123]);
  });

  test('formatting is applied after average', () => {
    sut(input);

    expect(formatToMoney).toHaveBeenCalledWith(someMockAverage);
  });

});
