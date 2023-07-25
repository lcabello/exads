import deepCopy from "../src/helpers/deepCopy.js";

describe('deepCopy tests', () => {
  test('It creates a deep copy of allowed types', () => {
    const example = [
      { key: 1, key2: 'hello' },
      { key: null },
      { key: ['hello', 'bye'] },
      { key: {key: [2]} }
    ]

    const result1 = deepCopy(example);
    expect(result1).toEqual(example);
    expect(result1).not.toBe(example);

    const example2 = [{key: [1,2,3,4, 'hello', null, undefined]}];
    const result2 = deepCopy(example2);
    result2[0].key[2] = 'luis',

    expect(result2[0].key[2]).toBe('luis');
    expect(example2[0].key[2]).not.toBe('luis');
  });
});
