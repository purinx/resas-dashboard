import axios from 'axios';
import { z } from 'zod';

import { AppError } from '../errors';
import { Endpoints, headers } from './constants';
import { logger } from '../logger';

const PrefecturesResponseSchema = z.object({
  message: z.string().nullable(),
  result: z.array(
    z.object({
      prefCode: z.number(),
      prefName: z.string(),
    }),
  ),
});

export type ResasPrefectureResponse = z.infer<typeof PrefecturesResponseSchema>;

export type Prefecture = ResasPrefectureResponse['result'][number];

export const fetchPrefectures = async (): Promise<ResasPrefectureResponse['result']> => {
  const res = await axios.get(Endpoints.prefectures, { headers }).catch((e) => {
    logger.error('Failed to fetch prefectures');
    throw e;
  });

  const parseResult = PrefecturesResponseSchema.safeParse(res.data);
  if (!parseResult.success) {
    logger.error('Failed to parse prefectures response');
    throw new AppError('ResasPrefectureParseError', parseResult.error.message);
  }
  return parseResult.data.result;
};
