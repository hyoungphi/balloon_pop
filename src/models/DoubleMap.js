class DoubleMap {
  #map;
  constructor(array) {
    this.#map = new Map();
    if (array === undefined) return;
    for (let i = 0; i < array.length; i++) {
      this.#map.set(array[i][0], new Map([[array[i][1], array[i][2]]]));
    }
  }

  add(x, y, v) {
    if (this.#map.has(x)) {
      if (this.#map.get(x).has(y)) return this;
      this.#map.get(x).set(y, v);
      return this;
    } else {
      this.#map.set(x, new Map([[y, v]]));
      return this;
    }
  }

  has(x, y) {
    if (this.#map.has(x)) {
      if (this.#map.get(x).has(y)) {
        return true;
      }
    }
    return this.#map.has(x) && this.#map.get(x).has(y);
  }

  get(x, y) {
    if (this.#map.has(x)) {
      if (this.#map.get(x).has(y)) {
        return this.#map.get(x).get(y);
      }
    }
    return null;
  }

  set(x, y, v) {
    if (this.#map.has(x)) {
      this.#map.get(x).set(y, v);
    } else {
      this.#map.set(x, new Map([[y, v]]));
    }
    return this;
  }

  delete(x, y) {
    if (this.#map.has(x)) {
      if (this.#map.get(x).has(y)) {
        this.#map.get(x).delete(y);
        if (this.#map.get(x).size === 0) {
          this.#map.delete(x);
        }
        return this;
      }
    }
    return this;
  }

  entries() {
    let entries = [];
    for (let [x, yMap] of this.#map) {
      for (let [y, v] of yMap) {
        entries.push([x, y, v]);
      }
    }
    return entries;
  }

  toObject() {
    let obj = [];
    for (let [x, yMap] of this.#map) {
      for (let [y, v] of yMap) {
        obj.push([x, y, v]);
      }
    }
    return obj;
  }

  static fromObject(obj) {
    let dm = new DoubleMap();
    for (let [x, y, v] of obj) {
      dm.add(x, y, v);
    }
    return dm;
  }

  isEqual(other) {
    if (this.size !== other.size) {
      return false;
    }
    for (let [x, y, v] of this.entries()) {
      if (other.get(x, y) !== v) {
        return false;
      }
    }
    return true;
  }

  get size() {
    let size = 0;
    // eslint-disable-next-line
    for (let [x, yMap] of this.#map) {
      size += yMap.size;
    }
    return size;
  }
}

export default DoubleMap;
