import Dimensions from 'models/Dimensions.js';

class Balloons {
  #locations;
  #dimensions;
  /**
   * @param {Map<int, Map<int, int>>} locations
   * @param {Dimensions} dimensions
   */
  constructor({ locations, dimensions }) {
    // TODO: Check that the Map is of the correct type
    console.assert(locations instanceof Map, 'locations must be a Map');
    console.assert(dimensions instanceof Dimensions, 'dimensions must be a Dimensions');
    this.#locations = locations;
    this.#dimensions = dimensions;
    this.maxPop = this.#calculateMaxPop();
  }

  get dimensions() { return this.#dimensions; }
  get locations() { return this.#locations; }



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
    if (!this.#locations.get(x) || !this.#locations.get(x).get(y)) {
      return pop;
    }

    let xs = [x - 1, x, x + 1].filter((x) => x >= 0 && x < this.#dimensions.rows);
    let ys = [y - 1, y, y + 1].filter((y) => y >= 0 && y < this.#dimensions.columns);
    for (let i = 0; i < xs.length; i++) {
      if (this.#locations.get(xs[i]) && this.#locations.get(xs[i]).get(y)) {
        pop++;
      }
    }
    for (let j = 0; j < ys.length; j++) {
      if (this.#locations.get(x) && this.#locations.get(x).get(ys[j])) {
        pop++;
      }
    }
    if (this.#locations.get(x) && this.#locations.get(x).get(y)) pop--;

    return pop;
  }

  #calculateMaxPop() {
    let maxPop = 0;

    for (let [x, row] of this.#locations.entries()) {
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
    console.assert(x < this.#dimensions.rows, 'x must be less than the first dimension');
    console.assert(y >= 0, 'y must be greater than or equal to 0');
    console.assert(y < this.#dimensions.columns, 'y must be less than the second dimension');

    if (!this.#checkMaxPop(x, y)) return null;

    console.log('keys: ', this.#locations.entries());
    this.#removeBalloon(x - 1, y);
    this.#removeBalloon(x, y);
    this.#removeBalloon(x + 1, y);
    this.#removeBalloon(x, y - 1);
    this.#removeBalloon(x, y + 1);

    return new Balloons({
      locations: this.#locations,
      dimensions: this.#dimensions
    });
  }

  /**
   * returns baloon exists or not at the given location
   * @param {int} x
   * @param {int} y
   * @returns {boolean}
   */
  isBalloonExists(x, y) {
    return this.#locations.get(x) && this.#locations.get(x).get(y);
  }

  #toObject() {
    return {
      locations: Object.fromEntries(
        [...this.#locations].map(([key, value]) => [
          key,
          Object.fromEntries([...value])
        ]
        )
      ),
      dimensions: this.#dimensions.toObject()
    };

  }

  toBase64() {
    const obj = this.#toObject();
    const json = JSON.stringify(obj);

    let base64;
    try {
      base64 = Buffer.from(json).toString('base64'); // for testing
    } catch (_) {
      try {

        base64 = btoa(json);
      } catch (e) {
        console.assert('failed to convert to base64 from string, string: ', json, ' error: ', e);
      }
    }

    return base64;
  }

  static fromBase64(base64) {
    let json;

    try {
      json = Buffer.from(base64, 'base64').toString('utf8');
    } catch (_) {
      try {
        json = atob(base64);
      } catch (e) {
        console.assert('failed to convert to string from base64, base64: ', base64, ' error: ', e);
      }
    }
    let obj;
    try {
      obj = JSON.parse(json);
      const locations = new Map(
        Object.entries(obj.locations).map(([key, value]) => [
          parseInt(key),
          new Map(Object.entries(value).map(([key, value]) => [parseInt(key), value]))
        ])
      );
      const dimensions = Dimensions.fromObject(obj.dimensions);

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
    if (this.#dimensions.rows !== balloons.dimensions.rows) {
      return false;
    }
    if (this.#dimensions.columns !== balloons.dimensions.columns) {
      return false;
    }
    if (this.#locations.size !== balloons.locations.size) {
      return false;
    }
    for (let [key, value] of this.#locations) {
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

  addBalloon(x, y) {
    if (this.#locations.has(x)) {
      if (this.#locations.get(x).has(y)) return false;
      this.#locations.get(x).set(y, 1);
      return true;
    } else {
      this.#locations.set(x, new Map([[y, 1]]));
      return true;
    }
  }

  #removeBalloon(x, y) {
    if (this.#locations.has(x)) {
      if (this.#locations.get(x).has(y)) {
        this.#locations.get(x).delete(y);
        if (this.#locations.get(x).size === 0) {
          this.#locations.delete(x);
        }
        return true;
      }
    }
    return false;
  }

  /**
   * 
   * @param {Dimensions} dimensions 
   */
  static random(dimensions) {
    console.assert(dimensions instanceof Dimensions, 'dimensions must be Dimensions');

    let balloon = new Balloons({ locations: new Map(), dimensions });

    // to fix random
    for (let i = 0; i < dimensions.rows; i++) {
      for (let j = 0; j < dimensions.columns; j++) {
        let r = Math.random();
        if (r > 0.5) {
          balloon.addBalloon(i, j);
        }
      }
    }
    return balloon;
  }
}

export default Balloons;
