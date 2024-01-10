import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found-page';

describe('Component: filter', () => {
  test('should render correctly', () => {
    render(
      <NotFoundPage />
    );

    expect(screen.getByText('404 not found')).toBeInTheDocument();
  });
});
