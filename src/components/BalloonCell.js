import './BalloonCell.css';

function BalloonCell({
  value,
  onClick,
}) {
  return (
    <div className="balloon-cell primary-container">
      <div
        className="balloon-cell__value"
        onClick={onClick}
      >{value}</div>
    </div>
  );
}

export default BalloonCell;
