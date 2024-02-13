import { useState } from 'react';
import Dimensions from 'models/Dimensions';

import './DimensionWidget.css';

function DimensionWidget(props) {
  let { dimensions, onChange, label } = props;
  console.assert(dimensions instanceof Dimensions, 'dimensions must be a Dimensions');
  console.assert(typeof onChange === 'function', 'onChange must be a function');

  label = label || 'Dimensions';

  const [d, setD] = useState(dimensions);
  return (
    <div className={'dimension-widget'}>
      <label>{label}</label>
      <div className='dimension-input'>
        <input
          className='secondary-container on-secondary-container-text'
          type='number'
          value={d.rows}
          onChange={(e) => {
            setD(new Dimensions({ rows: e.target.value, columns: d.columns }));
            onChange(new Dimensions({ rows: e.target.value, columns: d.columns }));
          }}
        />
        x
        <input
          className='secondary-container on-secondary-container-text'
          type='number'
          value={d.columns}

          onChange={(e) => {
            setD(new Dimensions({ rows: d.rows, columns: e.target.value }));
            onChange(new Dimensions({ rows: d.rows, columns: e.target.value }));


          }}
        />
      </div>
    </div>
  );
}

export default DimensionWidget;
