const sut = require('./utils.js');

describe('utils', () => {
  describe('#getAverage', () => {
    let input;
    beforeEach(() => {
      input = [2, 2, 5];
    });

    test('returns average', () => {
      const result = sut.getAverage(input);

      expect(typeof result).toBe('string');
      expect(result).toEqual('3.00');
    });

    test('floating number is two digits rounded', () => {
      const result = sut.getAverage(input);
      const symbolsAfterComma = result.split('.');
      expect(symbolsAfterComma[1].length).toBe(2);
    });

    test.each([[[false]], [[{}]]])('return NaN for "%s"', async (input) => {
      const result = sut.getAverage(input);

      expect(typeof result).toBe('string');
      expect(result).toEqual('NaN');
    });

  });

  describe('#getShare', () => {
    test('share is returned', () => {
      const result = sut.getShare(30, 300);
      expect(typeof result).toBe('string');
      expect(result).toEqual('10.00');
    });

    test('floating number is two digits rounded', () => {
      const result = sut.getShare(30, 200);
      const symbolsAfterComma = result.split('.');
      expect(symbolsAfterComma[1].length).toBe(2);
    });
  });

  describe('#withCache', () => {

    let someMockFunction;

    beforeEach(() => {
      jest.resetAllMocks();

      someMockFunction = jest.fn();
    });

    test('function is high-ordered', async () => {
      const wrappedFunction = sut.withCache(someMockFunction);
      await wrappedFunction();
      expect(someMockFunction).toHaveBeenCalled();
    });

    test('multiple arguments are passed', async () => {
      const someArgs = ['some args', false, 42];
      const wrappedFunction = sut.withCache(someMockFunction);
      await wrappedFunction(...someArgs);
      expect(someMockFunction).toHaveBeenCalledWith(...someArgs);
    });

    test('args are passed', async () => {
      const someArgument = 'arg';
      const wrappedFunction = sut.withCache(someMockFunction);
      await wrappedFunction(someArgument);
      expect(someMockFunction).toHaveBeenCalledWith(someArgument);
    });

    test('function is called only once with the same args', async () => {
      const someArgs = 'some args';
      const wrappedFunction = sut.withCache(someMockFunction);
      await wrappedFunction(someArgs);
      await wrappedFunction(someArgs);
      expect(someMockFunction).toHaveBeenCalledTimes(1);
    });

  });

});
