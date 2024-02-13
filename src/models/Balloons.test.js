import Balloons from './Balloons';
import Dimensions from 'models/Dimensions';
import SingleBalloon from './SingleBalloon';
import DoubleSet from './DoubleSet';

test('constructor', () => {
  const dimensions = new Dimensions({ rows: 6, columns: 6 });

  const doubleSet = new DoubleSet([
    [0, 0], [0, 1], [0, 5],
    [1, 2], [1, 4], [1, 5],
    [2, 1], [2, 2],
    [3, 1], [3, 3], [3, 4],
    [4, 2],
    [5, 2], [5, 5]
  ]);
  const baloons = Balloons.fromDoubleSet({
    doubleSet: doubleSet,
    dimensions: dimensions
  });
  expect(baloons).toBeInstanceOf(Balloons);
}
);

test('doPop', () => {
  const dimensions = new Dimensions({ rows: 6, columns: 6 });


  const doubleSet = new DoubleSet([
    [0, 0], [0, 1], [0, 5],
    [1, 2], [1, 4], [1, 5],
    [2, 1], [2, 2],
    [3, 1], [3, 3], [3, 4],
    [4, 2],
    [5, 2], [5, 5]
  ]);

  const balloons = Balloons.fromDoubleSet({
    doubleSet: doubleSet,
    dimensions: dimensions
  });

  expect(balloons.doPop(0, 0)).toBe(null);
  const popedBallons = balloons.doPop(1, 2);
  const expectPopedSet = new DoubleSet([
    [0, 0], [0, 1], [0, 5],
    [1, 4], [1, 5],
    [3, 3], [3, 4],
    [4, 2],
    [5, 2], [5, 5]
  ]);

  const expextPopedBalloons = Balloons.fromDoubleSet({ doubleSet: expectPopedSet, dimensions: dimensions });
  expect(popedBallons).toBeInstanceOf(Balloons);
  expect(popedBallons.isEqual(expextPopedBalloons)).toBe(true);
  expect(balloons.doPop(5, 5)).toBe(null);

  const doubleSet2 = new DoubleSet([
    [1, 4],
    [2, 1],
    [3, 1],
    [3, 3],
    [4, 2],
    [5, 1],
  ]);
  const balloons2 = Balloons.fromDoubleSet({
    doubleSet: doubleSet2,
    dimensions: dimensions
  });

  const popedBallons2 = balloons2.doPop(2, 1);
  const expectPopedSet2 = new DoubleSet([
    [1, 4],
    // [2, 1],
    // [3, 1],
    [3, 3],
    [4, 2],
    [5, 1]
  ]);
  const expextPopedBalloons2 = Balloons.fromDoubleSet({ doubleSet: expectPopedSet2, dimensions: dimensions });
  expect(popedBallons2).toBeInstanceOf(Balloons);
  expect(popedBallons2.isEqual(expextPopedBalloons2)).toBe(true);
  expect(balloons2.doPop(1, 4)).toBe(null);
}
);

test('Base64', () => {
  const dimensions = new Dimensions({ rows: 6, columns: 6 });

  const doubleSet = new DoubleSet([
    [0, 0], [0, 1], [0, 5],
    [1, 2], [1, 4], [1, 5],
    [2, 1], [2, 2],
    [3, 1], [3, 3], [3, 4],
    [4, 2],
    [5, 2], [5, 5]
  ]);
  const balloons = Balloons.fromDoubleSet({
    doubleSet: doubleSet,
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
