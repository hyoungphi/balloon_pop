import Balloons from './Balloons';

test('constructor', () => {
  const dimensions = [10, 10];
  const locations = new Map([
    [0, new Map([[0, 1], [1, 1], [4, 1], [9, 1]])],
    [1, new Map([[0, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1]])],
    [2, new Map([[0, 1], [1, 1], [4, 1], [9, 1]])],
    [3, new Map([[0, 1], [1, 1]])],
    [4, new Map([[0, 1], [1, 1]])],
    [5, new Map([[0, 1], [1, 1]])],
    [6, new Map([[0, 1], [1, 1]])],
    [7, new Map([[0, 1], [1, 1]])],
    [8, new Map([[0, 1], [1, 1]])],
    [9, new Map([[0, 1], [1, 1]])],
  ]);
  const baloons = new Balloons({
    locations: locations,
    dimensions: dimensions
  });
  expect(baloons).toBeInstanceOf(Balloons);
}
);

test('doPop', () => {
  const dimensions = [10, 10];
  const locations = new Map([
    [0, new Map([[0, 1], [1, 1], [4, 1], [9, 1]])],
    [1, new Map([[0, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1]])],
    [2, new Map([[0, 1], [1, 1], [4, 1], [9, 1]])],
    [3, new Map([[0, 1], [1, 1]])],
    [4, new Map([[0, 1], [1, 1]])],
    [5, new Map([[0, 1], [1, 1]])],
    [6, new Map([[0, 1], [1, 1]])],
    [7, new Map([[0, 1], [1, 1]])],
    [8, new Map([[0, 1], [1, 1]])],
    [9, new Map([[0, 1], [1, 1]])],
  ]);
  const baloons = new Balloons({
    locations: locations,
    dimensions: dimensions
  });

  expect(baloons.doPop(0, 0)).toBe(null);
  expect(baloons.doPop(1, 4)).toBeInstanceOf(Balloons);
}
);

test('Base64', () => {
  const dimensions = [10, 10];
  const locations = new Map([
    [0, new Map([[0, 1], [1, 1], [4, 1], [9, 1]])],
    [1, new Map([[0, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1]])],
    [2, new Map([[0, 1], [1, 1], [4, 1], [9, 1]])],
    [3, new Map([[0, 1], [1, 1]])],
    [4, new Map([[0, 1], [1, 1]])],
    [5, new Map([[0, 1], [1, 1]])],
    [6, new Map([[0, 1], [1, 1]])],
    [7, new Map([[0, 1], [1, 1]])],
    [8, new Map([[0, 1], [1, 1]])],
    [9, new Map([[0, 1], [1, 1]])],
  ]);
  const balloons = new Balloons({
    locations: locations,
    dimensions: dimensions
  });

  const base64 = balloons.toBase64();
  const newBalloons = Balloons.fromBase64(base64);
  const wrongBalloons1 = Balloons.fromBase64('wrong_base64');
  const wrongBalloons2 = Balloons.fromBase64(Buffer.from('wrong_format').toString('base64'));
  const wrongBalloons3 = Balloons.fromBase64(Buffer.from('{"1": 2, "2": 4}').toString('base64'));

  expect(newBalloons).toBeInstanceOf(Balloons);
  expect(wrongBalloons1).toBe(null);
  expect(wrongBalloons2).toBe(null);
  expect(wrongBalloons3).toBe(null);
  expect(newBalloons.isEqual(balloons)).toBe(true);

}
);
