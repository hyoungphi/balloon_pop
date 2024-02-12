import BalloonTable from "components/BalloonTable";
import DefaultPageWrapper from "components/DefaultPageWrapper";
import { useLocation } from "react-router-dom";
import Balloons from "utils/Balloons";

function GamePage() {
  const path = window.location.pathname.split('/')[1];
  const balloons = Balloons.fromBase64(path);
  return (
    <DefaultPageWrapper>
      <h1>Game Page</h1>
      <div>haha</div>
      <BalloonTable
        balloons={balloons}

      />
    </DefaultPageWrapper>
  );
}

export default GamePage;
