import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Title } from './index';

const dummyTitle = 'Hello';

describe('Title', () => {
  test('Renders passed content', async () => {
    render(<Title>{dummyTitle}</Title>);

    await screen.findByRole('heading');

    expect(screen.getByRole('heading')).toHaveTextContent(dummyTitle);
  });
});
