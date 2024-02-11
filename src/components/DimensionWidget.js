import { useState } from "react";

function DimensionWidget(props) {
  const { dimension, onChange } = props;
  console.assert(dimension.length === 2, 'Dimension must be an array of length 2');
  console.assert(typeof dimension[0] === 'number', 'First dimension must be a number');
  console.assert(typeof dimension[1] === 'number', 'Second dimension must be a number');
  console.assert(dimension[0] > 0, 'First dimension must be greater than 0');
  console.assert(dimension[1] > 0, 'Second dimension must be greater than 0');
  console.assert(typeof onChange === 'function', 'onChange must be a function');

  const [d, setD] = useState(dimension);
  return (
    <div>
      <input
        type="number"
        value={d[0]}
        onChange={(e) => {
          setD([e.target.value, d[1]]);
          onChange([e.target.value, d[1]]);
        }}
      />
      x
      <input
        type="number"
        value={d[1]}

        onChange={(e) => {
          setD([d[0], e.target.value]);
          onChange([d[0], e.target.value]);


        }}
      />
    </div>
  );
}

export default DimensionWidget;
