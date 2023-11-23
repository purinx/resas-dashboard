import { z } from 'zod';
import axios from 'axios';
import { Endpoints, headers } from './constants';
import { AppError } from '../errors';

const buildPopulationRequestUrl = (prefCode: number, cityCode: string = '-') => {
  return `${Endpoints.population}?cityCode${cityCode}&prefCode=${prefCode}`;
};

const PopulationResponseSchema = z.object({
  message: z.string().nullable(),
  result: z.object({
    boundaryYear: z.number(),
    data: z.array(
      z.object({
        label: z.enum(['総人口', '年少人口', '生産年齢人口', '老年人口']),
        data: z.array(
          z.object({
            rate: z.number().optional(),
            year: z.number(),
            value: z.number(),
          }),
        ),
      }),
    ),
  }),
});

export const fetchPopulations = async (prefCode: number, cityCode: string = '-') => {
  const res = await axios
    .get(buildPopulationRequestUrl(prefCode, cityCode), { headers })
    .catch((e) => {
      throw new AppError('ResasPopulationFetchError', e.message);
    });
  const parseResult = PopulationResponseSchema.safeParse(res.data);
  if (!parseResult.success) {
    throw new AppError('ResasPopulationParseError', parseResult.error.message);
  }
  return parseResult.data.result;
};

export const fetchPopulationsParallel = async (prefCodes: number[]) => {
  const entries = await Promise.all(
    prefCodes.map(async (prefCode) => {
      const populations = await fetchPopulations(prefCode);
      return [prefCode, populations] as const;
    }),
  );

  return Object.fromEntries(entries);
};
