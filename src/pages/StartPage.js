import { useState } from 'react';

import DefaultPageWrapper from 'components/DefaultPageWrapper';
import DimensionWidget from 'components/DimensionWidget';
import BalloonTable from 'components/BalloonTable';
import Balloons from 'models/Balloons';
import CommonButton from 'components/CommonButton';
import Dimensions from 'models/Dimensions';
import { useNavigate } from 'react-router-dom';

import './StartPage.css';

const DEFAULT_DIMENSION = new Dimensions({ rows: 6, columns: 6 });

function StartPage() {

  const [dimensions, setDimensions] = useState(DEFAULT_DIMENSION);
  const navigate = useNavigate();

  return (
    <DefaultPageWrapper>
      <div className='start-page-container'>

        <div
          className='dimension-widget-container on-background-text'
        >
          <DimensionWidget
            dimensions={dimensions}
            onChange={(value) => setDimensions(value)}
          />
        </div>
        <div
          className='balloon-table-container'
        >
          <BalloonTable
            balloons={Balloons.empty(dimensions)}
          />
        </div>
        <div
          className='start-button-container'
        >
          <CommonButton
            className='primary on-primary-text'
            onClick={() => {
              let path = Balloons.random(dimensions).toBase64();
              navigate(path);
            }}>Start Game</CommonButton>
        </div>
      </div>
    </DefaultPageWrapper>
  );
}

export default StartPage;
