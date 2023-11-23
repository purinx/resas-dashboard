import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Title } from './index';

const dummyTitle = 'Hello';

describe('Title', () => {
  // Due to a known issue where using vanilla-extract/recipe for styling in heading
  // will not work with jest.
  // c.f https://github.com/vanilla-extract-css/vanilla-extract/issues/1131
  test.skip('Renders passed content', async () => {
    render(<Title>{dummyTitle}</Title>);

    await screen.findByRole('heading');

    expect(screen.getByRole('heading')).toHaveTextContent(dummyTitle);
  });
});
