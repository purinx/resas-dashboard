import { Title } from '@/libs/components/typographies/Title';
import { PopulationStatistics } from '@/libs/features/populationStatistics';

import * as classes from './index.css';

type Props = {
  searchParams: NextSearchParams;
};

export default function Page({ searchParams }: Props) {
  return (
    <main className={classes.mainSection}>
      <Title>Resas Dashboard</Title>
      <PopulationStatistics searchParams={searchParams} />
    </main>
  );
}
