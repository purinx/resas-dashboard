import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { Endpoints } from './constants';
import dummyJson from './fixtures/populations.json';
import { fetchPopulations } from './populations';

const server = setupServer(
  http.get(Endpoints.population, () => {
    return HttpResponse.json(dummyJson);
  }),
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('fetchPopulations', () => {
  test('Normal: Ability to parse dummyJson returned from the API', async () => {
    const prefCode = 1;

    const res = await fetchPopulations(prefCode);
    expect(res).toEqual(dummyJson);
  });
});
