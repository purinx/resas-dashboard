import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import { Checkbox } from './index';

describe('Checkbox', () => {
  test('aria-checked is set correctly when unchecked.', async () => {
    render(
      <Checkbox onChange={() => {}} checked={false}>
        Test
      </Checkbox>,
    );

    const checkbox = await screen.findByRole('checkbox');

    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  test('aria-hidden is set correctly when checked.', async () => {
    render(
      <Checkbox onChange={() => {}} checked>
        Test
      </Checkbox>,
    );

    const checkbox = await screen.findByRole('checkbox');

    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  test('onChange should be called when clicked.', async () => {
    const onChange = jest.fn();
    render(
      <Checkbox checked={false} onChange={onChange}>
        Test
      </Checkbox>,
    );

    const checkbox = await screen.findByRole('checkbox');

    checkbox.click();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(true);
    });
  });
});
