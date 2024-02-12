/**
 * @class Dimensions
 * 
 */
class Dimensions {
  #rows;
  #columns;
  /**
   * @param {int} rows 
   * @param {int} columns 
   */
  constructor({ rows, columns }) {
    console.log(rows, columns);
    console.log(typeof rows, typeof columns);
    this.rows = rows;
    this.columns = columns;
  }

  get rows() { return this.#rows; }
  set rows(rows) {
    if (typeof rows == 'string') rows = parseInt(rows);
    console.assert(Number.isInteger(rows), 'rows must be a number');
    console.assert(rows > 0, 'rows must be greater than 0');
    this.#rows = rows;
  }

  get columns() { return this.#columns; }
  set columns(columns) {
    if (typeof columns == 'string') columns = parseInt(columns);
    console.assert(Number.isInteger(columns), 'columns must be a number');
    console.assert(columns > 0, 'columns must be greater than 0');
    this.#columns = columns;
  }

  toObject() {
    return {
      rows: this.rows,
      columns: this.columns
    };
  }
  static fromObject(obj) {
    try {
      return new Dimensions(obj);
    } catch (e) {
      return null;
    }
  }
}

export default Dimensions;
