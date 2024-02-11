import Header from 'components/Header';
import Footer from 'components/Footer';
import './DefaultPageWrapper.css';

function DefaultPageWrapper({ children }) {
  return (
    <div className='DefaultPageWrapper'>
      <Header />
      <div className='Content'>{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultPageWrapper;
