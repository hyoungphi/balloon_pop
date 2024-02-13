import DoubleSet from './DoubleSet';

test('DoubleSet', () => {
  const doubleSet = new DoubleSet([
    [1, 2],
    [3, 4],
  ]);
  expect(doubleSet.add(1, 4)).toBeInstanceOf(DoubleSet);
  expect(doubleSet.delete(1, 2)).toBeInstanceOf(DoubleSet);
  expect(doubleSet.has(1, 4)).toBe(true);
  expect(doubleSet.has(1, 2)).toBe(false);
});
