import { Title } from '@/libs/components/typographies/Title';
import { PopulationStatistics } from '@/libs/features/populationStatistics';
import * as classes from './index.css';

export default function Page() {
  return (
    <main className={classes.mainSection}>
      <Title>Resas Dashboard</Title>
      <PopulationStatistics />
    </main>
  );
}
