import { render, screen } from '@testing-library/react';
import Loader from 'components/Loader';

describe('Loader', () => {
  test('should render the Loader component', () => {
    render(<Loader />);

    const spinner = screen.getByText('Dejame pensar...');
    expect(spinner).toBeInTheDocument();
  });
});
