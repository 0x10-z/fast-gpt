import { render } from '@testing-library/react';
import Loader from 'components/Loader';

describe('Loader', () => {
  test('should render the Loader component', () => {
    const { getByText } = render(<Loader />);

    const spinner = getByText('Dejame pensar...');
    expect(spinner).toBeInTheDocument();
  });
});
