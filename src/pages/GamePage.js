import BalloonTable from 'components/BalloonTable';
import CommonButton from 'components/CommonButton';
import DefaultPageWrapper from 'components/DefaultPageWrapper';
import usePath from 'hooks/usePath';
import Balloons from 'models/Balloons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './GamePage.css';

function GamePage() {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [path, _] = usePath();
  const balloons = Balloons.fromBase64(path);
  const [isGameOver, setIsGameOver] = useState(false);

  const undo = () => {
    setIsGameOver(false);
  };


  const onPop = (i, j) => {
    const nextBalloons = balloons.doPop(i, j);
    if (nextBalloons === null) {
      setIsGameOver(true);
      return;
    }
    navigate(nextBalloons.toBase64());
  };
  return (
    <DefaultPageWrapper>
      <div className='game-page-container'>
        <div className='dummy-container'></div>
        <div className='balloon-table-container'>
          {balloons.isCleared() &&
            <h2 className='primary-text'>Clear!</h2>
          }
          {isGameOver &&
            <div>
              <h2 className='on-background-text'>Game Over</h2>
              <CommonButton
                className='primary on-primary-text'
                onClick={() => {
                  undo();
                }
                }>
                Undo
              </CommonButton>
            </div>
          }
          {!isGameOver && !balloons.isCleared() &&
            <BalloonTable
              balloons={balloons}
              onPop={onPop}
            />
          }
        </div>
        <div className='new-game-button-container'>
          <CommonButton
            className='secondary on-secondary-text'
            onClick={() => { navigate('/'); }}>
            New Game
          </CommonButton>
        </div>
      </div>
    </DefaultPageWrapper>
  );
}

export default GamePage;
