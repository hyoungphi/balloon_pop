class DoubleSet {
  #map;
  constructor(array) {
    this.#map = new Map();
    if (array === undefined) return;
    for (let i = 0; i < array.length; i++) {
      if (this.#map.has(array[i][0]))
        this.#map.get(array[i][0]).add(array[i][1]);
      else
        this.#map.set(array[i][0], new Set([array[i][1]]));
    }
  }

  add(x, y) {
    if (this.#map.has(x)) {
      if (this.#map.get(x).has(y)) return this;
      this.#map.get(x).add(y);
      return this;
    } else {
      this.#map.set(x, new Set([y]));
      return this;
    }
  }

  has(x, y) {
    return this.#map.has(x) && this.#map.get(x).has(y);
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
    for (let [x, ySet] of this.#map) {
      for (let y of ySet) {
        entries.push([x, y]);
      }
    }
    return entries;
  }

  get size() {
    let size = 0;
    // eslint-disable-next-line
    for (let [x, ySet] of this.#map) {
      size += ySet.size;
    }
    return size;
  }

  toObject() {
    let obj = [];
    for (let [x, ySet] of this.#map) {
      for (let y of ySet) {
        obj.push([x, y]);
      }
    }
    return obj;
  }

  static fromObject(obj) {
    let ds = new DoubleSet();
    for (let [x, y] of obj) {
      ds.add(x, y);
    }
    return ds;
  }
}

export default DoubleSet;
