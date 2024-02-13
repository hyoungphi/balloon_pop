import './BalloonCell.css';

function BalloonCell({
  value,
  onClick,
}) {
  return (
    <div className={'balloon-cell secondary-container ' + (value ? 'active' : '')}>
      <div
        className='balloon-cell__value'
        onClick={onClick}
      >{value}</div>
    </div>
  );
}

export default BalloonCell;
