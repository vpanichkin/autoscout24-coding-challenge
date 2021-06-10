jest.mock('../../shared/utils.js');
jest.mock('../../shared/mappers/stringMappers.js');


const { getShare } = require('../../shared/utils.js');
const { formatShare } = require('../../shared/mappers/stringMappers.js');
const sut = require('./calculateDistribution.js');

describe('#calculateDistribution', () => {

  const someMockShare = 'some mock share';
  const someShareFormattingOutput = 'output';
  let input;
  let outputEntries;

  beforeEach(() => {
    jest.resetAllMocks();

    input = [[
      { id: 1, make: 'audi' },
      { id: 2, make: 'volvo' },
      { id: 3, make: 'audi' }
    ]];

    outputEntries = [
      ['audi', someShareFormattingOutput],
      ['volvo', someShareFormattingOutput],
    ];

    getShare.mockReturnValue(someMockShare);
    formatShare.mockReturnValue(someShareFormattingOutput);
  });

  test('return valid report', () => {
    const result = sut(input);

    expect(result).toEqual(expect.objectContaining({
      captions: ['Make', 'Distribution'],
      entries: outputEntries
    }));
    expect(getShare).toHaveBeenCalledWith(expect.any(Number), input[0].length);
  });

  test('result is formatted', () => {
    sut(input);
    expect(formatShare).toHaveBeenCalledWith(someMockShare);
  });

});
