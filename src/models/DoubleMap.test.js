import DoubleMap from './DoubleMap';

test('DoubleMap', () => {
  const doubleMap = new DoubleMap([
    [1, [2, 3], [4, 5]],
    [6, [7, 8], [9, 10]],
  ]);
  expect(doubleMap.add(1, 4, 7)).toBeInstanceOf(DoubleMap);
  expect(doubleMap.delete(1, 2)).toBeInstanceOf(DoubleMap);
  expect(doubleMap.has(1, 4)).toBe(true);
  expect(doubleMap.get(1, 4)).toBe(7);
  expect(doubleMap.has(1, 2)).toBe(false);
  expect(doubleMap.get(1, 2)).toBe(null);
});
