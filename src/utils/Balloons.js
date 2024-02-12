class Balloons {
  /**
   * @param {Map<int, Map<int, int>>} locations
   * @param {Array<int>} dimensions
   */
  constructor({ locations, dimensions }) {
    // TODO: Check that the Map is of the correct type
    console.assert(locations instanceof Map, 'Locations must be a Map');
    console.assert(dimensions.length === 2, 'Dimensions must be an array of length 2');
    console.assert(dimensions[0] > 0, 'First dimension must be greater than 0');
    console.assert(dimensions[1] > 0, 'Second dimension must be greater than 0');
    this.locations = locations;
    this.dimensions = dimensions;
    this.maxPop = this.#calculateMaxPop();
  }



  /**
   * @param {int} x
   * @param {int} y
   * @returns {boolean}
   */
  #checkMaxPop(x, y) {
    let pop = this.#calculatePop(x, y);
    if (pop < this.maxPop) {
      return false;
    }
    return true;
  }

  #calculatePop(x, y) {
    let pop = 0;
    if (!this.locations.get(x) || !this.locations.get(x).get(y)) {
      return pop;
    }

    let xs = [x - 1, x, x + 1].filter((x) => x >= 0 && x < this.dimensions[0]);
    let ys = [y - 1, y, y + 1].filter((y) => y >= 0 && y < this.dimensions[1]);
    for (let i = 0; i < xs.length; i++) {
      if (this.locations.get(xs[i]) && this.locations.get(xs[i]).get(y)) {
        pop++;
      }
    }
    for (let j = 0; j < ys.length; j++) {
      if (this.locations.get(x) && this.locations.get(x).get(ys[j])) {
        pop++;
      }
    }
    if (this.locations.get(x) && this.locations.get(x).get(y)) pop--;

    return pop;
  }

  #calculateMaxPop() {
    let maxPop = 0;

    for (let [x, row] of this.locations.entries()) {
      for (let [y, _] of row.entries()) {
        let pop = this.#calculatePop(x, y);
        maxPop = Math.max(maxPop, pop);
        if (maxPop === 5) return maxPop;
      }
    }

    return maxPop;
  }

  /**
   * returns new baloons after popping the baloon at the given location.
   * If the pop is not maximum, returns null.
   * @param {int} x
   * @param {int} y
   * @returns {Balloons | null}
   */
  doPop(x, y) {
    console.assert(Number.isInteger(x), 'x must be an integer');
    console.assert(Number.isInteger(y), 'y must be an integer');
    console.assert(x >= 0, 'x must be greater than or equal to 0');
    console.assert(x < this.dimensions[0], 'x must be less than the first dimension');
    console.assert(y >= 0, 'y must be greater than or equal to 0');
    console.assert(y < this.dimensions[1], 'y must be less than the second dimension');

    if (!this.#checkMaxPop(x, y)) return null;
    let newLocations = new Map([...this.locations].filter((row, r) =>
      [...row].filter((column, c) =>
        !(
          (r === x && c === y) ||
          (r === x - 1 && c === y) ||
          (r === x + 1 && c === y) ||
          (r === x && c === y - 1) ||
          (r === x && c === y + 1)
        )
      )
    )
    );

    return new Balloons({
      locations: newLocations,
      dimensions: this.dimensions
    });
  }

  /**
   * returns baloon exists or not at the given location
   * @param {int} x
   * @param {int} y
   * @returns {boolean}
   */
  isBalloonExists(x, y) {
    return this.locations.get(x) && this.locations.get(x).get(y);
  }

  #toObject() {
    return {
      locations: Object.fromEntries(
        [...this.locations].map(([key, value]) => [
          key,
          Object.fromEntries([...value])
        ]
        )
      ),
      dimensions: this.dimensions
    };

  }

  toBase64() {
    const obj = this.#toObject();
    const json = JSON.stringify(obj);

    return Buffer.from(json).toString('base64');
  }

  static fromBase64(base64) {
    const json = Buffer.from(base64, 'base64').toString('utf8');
    let obj;
    try {
      obj = JSON.parse(json);
      const locations = new Map(
        Object.entries(obj.locations).map(([key, value]) => [
          parseInt(key),
          new Map(Object.entries(value).map(([key, value]) => [parseInt(key), value]))
        ])
      );
      const dimensions = obj.dimensions;

      return new Balloons({ locations, dimensions });
    }
    catch (e) {
      return null;
    }

  }

  /**
   * Check input Balloons is same
   * @param {Balloons} balloons 
   * @returns 
   */
  isEqual(balloons) {
    if (!(balloons instanceof Balloons)) {
      return false;
    }
    if (this.dimensions.length !== balloons.dimensions.length) {
      return false;
    }
    if (this.dimensions[0] !== balloons.dimensions[0]) {
      return false;
    }
    if (this.dimensions[1] !== balloons.dimensions[1]) {
      return false;
    }
    if (this.locations.size !== balloons.locations.size) {
      return false;
    }
    for (let [key, value] of this.locations) {
      if (!balloons.locations.has(key)) {
        return false;
      }
      if (value.size !== balloons.locations.get(key).size) {
        return false;
      }
      for (let [k, v] of value) {
        if (!balloons.locations.get(key).has(k)) {
          return false;
        }
      }
    }
    return true;
  }
}

export default Balloons;
