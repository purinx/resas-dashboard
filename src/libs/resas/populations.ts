import { z } from 'zod';
import { Endpoints, headers } from './constants';
import axios from 'axios';

const buildPopulationRequestUrl = (prefCode: number, cityCode: string = '-') => {
  return `${Endpoints.population}?cityCode${cityCode}&prefCode=${prefCode}`;
};

export const PopulationResponseSchema = z.object({
  message: z.string().nullable(),
  result: z.object({
    boundaryYear: z.number(),
    data: z.array(
      z.object({
        label: z.enum(['総人口', '年少人口', '生産年齢人口', '老年人口']),
        data: z.array(
          z.object({
            year: z.number(),
            value: z.number(),
          }),
        ),
      }),
    ),
  }),
});

export const fetchPopulations = async (prefCode: number, cityCode: string = '-') => {
  const res = await axios.get(buildPopulationRequestUrl(prefCode, cityCode), { headers });
  console.log(JSON.stringify(res.data));
};
