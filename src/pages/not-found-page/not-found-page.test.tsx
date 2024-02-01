import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found-page';
import { MemoryRouter } from 'react-router-dom';

describe('Component: not-found-page', () => {
  test('should render correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404 not found')).toBeInTheDocument();
  });
});
