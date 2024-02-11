import DefaultPageWrapper from 'components/DefaultPageWrapper';
import DimensionWidget from 'components/DimensionWidget';

const DEFAULT_DIMENSION = [5, 5];

function StartPage() {

  let dimension = DEFAULT_DIMENSION;
  return (
    DefaultPageWrapper(
      <div>
        <h1>Start Page</h1>
        <DimensionWidget
          dimension={dimension}
          onChange={(value) => dimension = value}
        />
      </div>
    )
  );
}

export default StartPage;
