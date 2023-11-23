import { z } from 'zod';
import uniq from 'lodash.uniq';
import axios from 'axios';
import { Endpoints, headers } from './constants';
import { AppError } from '../errors';

export const PopulationLabelSchema = z.enum([
  '総人口',
  '年少人口',
  '生産年齢人口',
  '老年人口',
]);

const PopulationResponseSchema = z.object({
  message: z.string().nullable(),
  result: z.object({
    boundaryYear: z.number(),
    data: z.array(
      z.object({
        label: PopulationLabelSchema,
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

export type PopulationLabel = z.infer<typeof PopulationLabelSchema>;

export type PopulationResponse = z.infer<typeof PopulationResponseSchema>;

export type PopulationsMap = { [prefCode: string]: PopulationResponse['result'] };

const buildPopulationRequestUrl = (prefCode: number, cityCode: string = '-') => {
  return `${Endpoints.population}?cityCode${cityCode}&prefCode=${prefCode}`;
};

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
    uniq(prefCodes).map(async (prefCode) => {
      const populations = await fetchPopulations(prefCode);
      return [prefCode, populations] as const;
    }),
  );

  return Object.fromEntries(entries);
};
