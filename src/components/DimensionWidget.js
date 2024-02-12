import { useState } from "react";
import Dimensions from "models/Dimensions";

function DimensionWidget(props) {
  const { dimensions, onChange } = props;
  console.assert(dimensions instanceof Dimensions, 'dimensions must be a Dimensions');
  console.assert(typeof onChange === 'function', 'onChange must be a function');

  const [d, setD] = useState(dimensions);
  return (
    <div>
      <input
        type="number"
        value={d.rows}
        onChange={(e) => {
          setD(new Dimensions({ rows: e.target.value, columns: d.columns }));
          onChange(new Dimensions({ rows: e.target.value, columns: d.columns }));
        }}
      />
      x
      <input
        type="number"
        value={d.columns}

        onChange={(e) => {
          setD(new Dimensions({ rows: d.rows, columns: e.target.value }));
          onChange(new Dimensions({ rows: d.rows, columns: e.target.value }));


        }}
      />
    </div>
  );
}

export default DimensionWidget;
