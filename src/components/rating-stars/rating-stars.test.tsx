import { render } from '@testing-library/react';
import RatingStars from './rating-stars';

describe('Component: rating stars', () => {
  test('should render correctly', () => {
    const {container} = render(
      <RatingStars rating={3} />
    );

    const stars = container.querySelectorAll('svg');

    expect(stars.length).toBe(5);

    for (let i = 0; i < 3; i++) {
      const useElement = stars[i].querySelector('use') as SVGUseElement;
      expect(useElement.getAttribute('xlink:href')).toBe('#icon-full-star');
    }
    for (let i = 3; i < 5; i++) {
      const useElement = stars[i].querySelector('use') as SVGUseElement;
      expect(useElement.getAttribute('xlink:href')).toBe('#icon-star');
    }
  });
});
