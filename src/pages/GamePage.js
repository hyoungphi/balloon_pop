import BalloonTable from "components/BalloonTable";
import CommonButton from "components/CommonButton";
import CommonModal from "components/CommonModal";
import DefaultPageWrapper from "components/DefaultPageWrapper";
import usePath from "hooks/usePath";
import Balloons from "models/Balloons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      {balloons.isCleared() && <div>Clear!</div>}
      <CommonButton
        onClick={() => { navigate('/'); }}
      >
        New Game
      </CommonButton>
      {isGameOver &&
        <CommonModal
          title='Game Over'

          children={
            <div>
              <CommonButton onClick={() => {
                undo();
              }}>
                Undo
              </CommonButton>
            </div>
          }
        />
      }
      {!isGameOver && !balloons.isCleared() &&
        <BalloonTable
          balloons={balloons}
          onPop={onPop}
        />
      }
    </DefaultPageWrapper>
  );
}

export default GamePage;
