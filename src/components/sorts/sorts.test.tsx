import { render, screen } from '@testing-library/react';
import Sorts from './sorts';

describe('Component: filter', () => {
  test('should render correctly', () => {
    render(
      <Sorts />
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });
});
