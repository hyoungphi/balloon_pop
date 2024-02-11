import Baloons from './Balloons';

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
    const baloons = new Baloons(locations, dimensions);
    expect(baloons).toBeInstanceOf(Baloons);
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
    const baloons = new Baloons(locations, dimensions);

    expect(baloons.doPop(0, 0)).toBe(null);
    expect(baloons.doPop(1, 4)).toBeInstanceOf(Baloons);
}
);
