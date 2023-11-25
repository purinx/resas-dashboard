import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

import dummyPrefectures from '@/libs/resas/fixtures/prefectures';

import { PrefectureSelector } from './index';

jest.mock('../usePrefectureSelect', () => {
  return {
    ...jest.requireActual('../usePrefectureSelect'),
    useSyncPrefCode: jest.fn(),
  };
});

describe('PrefectureSelector', () => {
  test('Displays prefecture names', async () => {
    render(<PrefectureSelector prefectureOptions={dummyPrefectures.result} />);

    await screen.findByTestId('PrefectureSelector');

    dummyPrefectures.result.forEach((pref) => {
      expect(screen.getByText(pref.prefName)).toBeInTheDocument();
    });
  });

  test('Can toggle each prefecture select', async () => {
    render(<PrefectureSelector prefectureOptions={dummyPrefectures.result} />);

    await screen.findByTestId('PrefectureSelector');

    dummyPrefectures.result.forEach((pref) => {
      const checkbox = screen.getByText(pref.prefName);
      act(() => {
        checkbox.click();
      });

      expect(screen.getByRole('checkbox', { name: pref.prefName })).toHaveAttribute(
        'aria-checked',
        'true',
      );

      act(() => {
        checkbox.click();
      });

      expect(screen.getByRole('checkbox', { name: pref.prefName })).toHaveAttribute(
        'aria-checked',
        'false',
      );
    });
  });
});
