jest.mock('../../shared/utils.js');

const { getAverage } = require('../../shared/utils.js');
const sut = require('./calculateAverage.js');

describe('#calculateAverage', () => {

  const someMockAverage = 'some mock average';
  let input;
  let entriesOutput;

  beforeEach(() => {
    jest.resetAllMocks();

    input = [[
      { price: 123, seller_type: 'private' },
      { price: 583, seller_type: 'private' },
      { price: 237, seller_type: 'other' }
    ]];

    entriesOutput = [
      ['private', someMockAverage],
      ['other', someMockAverage]
    ];

    getAverage.mockReturnValue(someMockAverage);
  });

  test('return valid report', () => {
    const result = sut(input);
    expect(result).toEqual(expect.objectContaining({
      captions: ['Seller Type', 'Average in Euro'],
      entries: expect.arrayContaining(entriesOutput)
    }));
    expect(getAverage).toHaveBeenCalledTimes(2);
  });


});
