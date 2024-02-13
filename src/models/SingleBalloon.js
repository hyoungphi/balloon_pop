class SingleBalloon {
  #x;
  #y;
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }
  get x() { return this.#x; }
  get y() { return this.#y; }
  set x(x) {
    console.assert(Number.isInteger(x), 'x must be an integer');
    console.assert(x >= 0, 'x must be greater than or equal to 0');
    this.#x = x;
  }
  set y(y) {
    console.assert(Number.isInteger(y), 'y must be an integer');
    console.assert(y >= 0, 'y must be greater than or equal to 0');
    this.#y = y;
  }

  toObject() {
    return { x: this.x, y: this.y };
  }

  static fromObject(obj) {
    return new SingleBalloon(obj);
  }

  isEqual(other) {
    return this.x == other.x && this.y == other.y;
  }

}

export default SingleBalloon;
