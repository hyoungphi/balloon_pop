import './BalloonCell.css';

function BalloonCell({ value }) {
  return (
    <div className="balloon-cell primary-container">
      <div className="balloon-cell__value">{value}</div>
    </div>
  );
}

export default BalloonCell;
