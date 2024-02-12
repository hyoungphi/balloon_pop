import Balloons from "utils/Balloons";
import BalloonCell from "./BalloonCell";
import Dimensions from "utils/Dimensions";

function BalloonTable(props) {
  const { balloons, dimensions } = props;

  console.assert(balloons instanceof Balloons, 'Balloons must be an instance of Balloons');
  console.assert(dimensions instanceof Dimensions, 'dimensions must be a Dimensions');

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
