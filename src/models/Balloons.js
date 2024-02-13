import Dimensions from 'models/Dimensions.js';
// import SingleBalloon from './SingleBalloon';
import DoubleSet from './DoubleSet';
import DoubleMap from './DoubleMap';

class Balloons {
  #groups;
  #locations;
  #dimensions;
  /**
   * @param {Map<DoubleSet>} groups
   * @param {DoubleMap} locations
   * @param {Dimensions} dimensions
   */
  constructor({ groups, locations, dimensions }) {
    console.assert(groups instanceof Map, 'groups must be a Map');
    console.assert(locations instanceof DoubleMap, 'locations must be a DoubleMap');
    console.assert(dimensions instanceof Dimensions, 'dimensions must be a Dimensions');

    this.#dimensions = dimensions;
    this.#groups = groups;
    this.#locations = locations;
  }

  get dimensions() { return this.#dimensions; }
  get locations() { return this.#locations; }


  /**
   * 
   * @param {DoubleSet} ballonSet 
   */
  static calculateGroups(ballonSet) {
    console.assert(ballonSet instanceof DoubleSet, 'ballonSet must be a DoubleSet');
    let groups = new Map();
    let locations = new DoubleMap();
    let toVisit = ballonSet;
    let groupNumber = 0;

    while (toVisit.size > 0) {
      let balloon = toVisit.entries()[0];
      groups.set(groupNumber, new DoubleSet([balloon]));
      locations.set(balloon[0], balloon[1], groupNumber);
      toVisit.delete(balloon[0], balloon[1]);
      let neighbors = Balloons.getNeighbors(balloon[0], balloon[1], toVisit);
      while (neighbors.length > 0) {
        let neighbor = neighbors.pop();
        groups.get(groupNumber).add(neighbor[0], neighbor[1]);
        locations.set(neighbor[0], neighbor[1], groupNumber);
        toVisit.delete(neighbor[0], neighbor[1]);
        neighbors = neighbors.concat(Balloons.getNeighbors(neighbor[0], neighbor[1], toVisit));
      }
      groupNumber++;
    }
    let printGroups = [];
    for (let [groupNumber, balloons] of groups.entries()) {
      printGroups.push([groupNumber, ...balloons.entries()]);
    }
    return { groups, locations };
  }


  static getNeighbors(x, y, ballonSet) {
    let neighbors = [];
    if (ballonSet.has(x - 1, y)) {
      neighbors.push([x - 1, y]);
    }
    if (ballonSet.has(x + 1, y)) {
      neighbors.push([x + 1, y]);
    }
    if (ballonSet.has(x, y - 1)) {
      neighbors.push([x, y - 1]);
    }
    if (ballonSet.has(x, y + 1)) {
      neighbors.push([x, y + 1]);
    }
    return neighbors;
  }


  #checkMaxPop(x, y) {
    let pop = this.#calculatePop(x, y);
    let maxPop = 0;
    // eslint-disable-next-line
    for (let [_, ds] of this.#groups.entries()) {
      maxPop = Math.max(maxPop, ds.size);
    }
    if (pop < maxPop) {
      return false;
    }
    return true;
  }

  #calculatePop(x, y) {
    let pop = 0;
    if (!this.#locations.has(x, y)) return pop;
    let groupNumber = this.#locations.get(x, y);
    if (!this.#groups.has(groupNumber)) return pop;
    let pops = this.#groups.get(groupNumber);
    return pops.size;
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

    let groupNumber = this.#locations.get(x, y);
    let newGroups = new Map();
    for (let [key, ds] of this.#groups.entries()) {
      if (key !== groupNumber) {
        newGroups.set(key, ds);
      }
    }
    let newLocations = new DoubleMap();
    for (let [x, y, v] of this.#locations.entries()) {
      if (v !== groupNumber) {
        newLocations.set(x, y, v);
      }
    }

    return new Balloons({
      groups: newGroups,
      locations: newLocations,
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
    return this.#locations.has(x, y);
  }

  toObject() {
    let objGroups = [];
    for (let [groupNumber, balloons] of this.#groups.entries()) {
      objGroups.push([groupNumber, balloons.entries()]);
    }
    return {
      groups: objGroups,
      locations: this.#locations.toObject(),
      dimensions: this.#dimensions.toObject()
    };

  }

  toBase64() {
    const obj = this.toObject();
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
      let groups = new Map();
      for (let [groupNumber, balloons] of obj.groups) {
        groups.set(groupNumber, DoubleSet.fromObject(balloons));
      }
      const locations = DoubleMap.fromObject(obj.locations);
      const dimensions = Dimensions.fromObject(obj.dimensions);
      if (!groups || !locations || !dimensions) return null;

      return new Balloons({ groups, locations, dimensions });
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
    if (!(balloons instanceof Balloons))
      return false;
    if (this.#dimensions.rows !== balloons.dimensions.rows)
      return false;
    if (this.#dimensions.columns !== balloons.dimensions.columns)
      return false;
    if (this.#locations.size !== balloons.locations.size)
      return false;
    if (!this.#locations.isEqualWOValue(balloons.locations))
      return false;

    return true;
  }



  /**
   * 
   * @param {Dimensions} dimensions 
   */
  static random(dimensions) {
    console.assert(dimensions instanceof Dimensions, 'dimensions must be Dimensions');

    let doubleSet = new DoubleSet();

    const gernerateRandom = (rows, columns) => {
      let ds = new DoubleSet();

      // TODO: fix random
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let r = Math.random();
          if (r > 0.5) {
            ds.add(i, j);
          }
        }
      }
      return ds;
    };

    while (doubleSet.size === 0) {
      doubleSet = gernerateRandom(dimensions.rows, dimensions.columns);
    }
    return Balloons.fromDoubleSet({ doubleSet, dimensions });
  }

  static empty(dimensions) {
    console.assert(dimensions instanceof Dimensions, 'dimensions must be Dimensions');
    return new Balloons({ groups: new Map(), locations: new DoubleMap(), dimensions });
  }

  static fromDoubleSet({ doubleSet, dimensions }) {
    console.assert(doubleSet instanceof DoubleSet, 'doubleSet must be a DoubleSet');
    console.assert(dimensions instanceof Dimensions, 'dimensions must be a Dimensions');

    const { groups, locations } = Balloons.calculateGroups(doubleSet);
    return new Balloons({ groups, locations, dimensions });
  }


  isCleared() {
    return this.#locations.size === 0;
  }
}

export default Balloons;
