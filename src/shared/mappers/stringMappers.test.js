const sut = require('./stringMappers.js');

describe('stringMappers', () => {
  describe('#formatToMoney', () => {

    test('format is correct', () => {
      const result = sut.formatToMoney(123);
      expect(result).toEqual(expect.stringMatching(/^€ .+, -$/),)
    });

    test('accepts stringified numbers', ()=> {
      const someStringifiedNumber = '123';
      expect(sut.formatToMoney(someStringifiedNumber)).toEqual(`€ 123, -`)
    })

  });

  describe('#formatToMileage', () => {
    test('format is correct, i.e KM is included', () => {
      const result = sut.formatToMileage(123);
      expect(result).toEqual(expect.stringMatching(/^.+ KM$/),)
    });
  });

  describe('#formatShare', () => {
    test('format is correct, i.e % is included', () => {
      const result = sut.formatShare(123);
      expect(result).toEqual(expect.stringMatching(/^.+%$/),)
    });
  });
});
