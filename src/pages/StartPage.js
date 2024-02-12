import { useState } from 'react';

import DefaultPageWrapper from 'components/DefaultPageWrapper';
import DimensionWidget from 'components/DimensionWidget';
import BalloonTable from 'components/BalloonTable';
import Balloons from 'utils/Balloons';
import CommonButton from 'components/CommonButton';
import Dimensions from 'utils/Dimensions';

const DEFAULT_DIMENSION = new Dimensions({ rows: 5, columns: 5 });

function StartPage() {

  // let dimensions = DEFAULT_DIMENSION;

  let [dimensions, setDimensions] = useState(DEFAULT_DIMENSION);

  return (
    <DefaultPageWrapper>

      <div>
        <h1 className='on-background-text'>Start Page</h1>
        <DimensionWidget
          dimensions={dimensions}
          onChange={(value) => setDimensions(value)}
        />
        <BalloonTable
          balloons={new Balloons({
            locations: new Map(),
            dimensions: dimensions
          })}
          dimensions={dimensions} />
        <CommonButton
          className='primary on-primary-text'
          onClick={() => console.log('hyoungphi - Start Button')}>Start Game</CommonButton>
      </div>
    </DefaultPageWrapper>
  );
}

export default StartPage;
