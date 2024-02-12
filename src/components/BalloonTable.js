import Balloons from "utils/Balloons";
import BalloonCell from "./BalloonCell";

function BalloonTable(props) {
  const { balloons } = props;
  const dimensions = balloons.dimensions;

  console.assert(balloons instanceof Balloons, 'Balloons must be an instance of Balloons');

  return (
    <table>
      <tbody>
        {Array.from({ length: dimensions.rows }, (_, i) => (
          <tr key={i}>
            {Array.from({ length: dimensions.columns }, (_, j) => (
              <td key={j}>
                <BalloonCell value={balloons.isBalloonExists(i, j) ? '🎈' : ''} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BalloonTable;
