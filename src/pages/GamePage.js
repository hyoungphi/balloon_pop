import BalloonTable from "components/BalloonTable";
import DefaultPageWrapper from "components/DefaultPageWrapper";
import usePath from "hooks/usePath";
import Balloons from "models/Balloons";
import { useNavigate } from "react-router-dom";

function GamePage() {
  const navigate = useNavigate();
  const [path, _] = usePath();
  const balloons = Balloons.fromBase64(path);
  const onPop = (i, j) => {
    console.log('hyoungphi - onPop, GamePage, i, j: ', i, j);
    const nextBalloons = balloons.doPop(i, j);
    if (nextBalloons === null) {
      //TODO: Game Over
      alert('Game Over');
      return;
    }
    //TODO: Cleared must to move to init
    if (nextBalloons.isCleared()) {
      alert('Cleared');
      return;

    }
    navigate(nextBalloons.toBase64());
  };
  return (
    <DefaultPageWrapper>
      <h1>Game Page</h1>
      <div>haha</div>
      <BalloonTable
        balloons={balloons}
        onPop={onPop}
      />
    </DefaultPageWrapper>
  );
}

export default GamePage;
