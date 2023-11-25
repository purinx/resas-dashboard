import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

import { PopulationLabelSelector } from '.';

const options: string[] = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

describe('PopulationLabelSelector', () => {
  test('Can select population label', async () => {
    render(<PopulationLabelSelector />);

    await screen.findByTestId('PopulationLabelSelector');

    for (const option of options) {
      const checkbox = screen.getByText(option);
      act(() => {
        checkbox.click();
      });

      expect(screen.getByRole('checkbox', { name: option })).toHaveAttribute(
        'aria-checked',
        'true',
      );

      const others = options.filter((_) => _ !== option);
      others.forEach((other) => {
        expect(screen.getByRole('checkbox', { name: other })).toHaveAttribute(
          'aria-checked',
          'false',
        );
      });
    }
  });
});
