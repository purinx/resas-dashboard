import { z } from 'zod';
import uniq from 'lodash.uniq';

import { Endpoints, headers } from './constants';
import { AppError } from '../errors';
import { logger } from '../logger';

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
  const res = await fetch(buildPopulationRequestUrl(prefCode, cityCode), {
    headers,
  }).catch((e) => {
    logger.error(`Failed to fetch populations. prefCode: ${prefCode}`);
    throw e;
  });

  if (!res.ok) {
    logger.error(`Failed to fetch populations. prefCode: ${prefCode}`);
    throw new AppError('ResasPopulationFetchError', res.statusText);
  }

  const parseResult = PopulationResponseSchema.safeParse(await res.json());
  if (!parseResult.success) {
    logger.error(`Failed to parse populations response. prefCode: ${prefCode}`);
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
