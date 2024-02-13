import Header from 'components/Header';
import './DefaultPageWrapper.css';

function DefaultPageWrapper({ children }) {
  return (
    <div className='DefaultPageWrapper background'>
      <Header />
      <div className='content'>{children}</div>
    </div>
  );
}

export default DefaultPageWrapper;
