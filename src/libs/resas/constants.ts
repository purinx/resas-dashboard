const BasePath = process.env.RESAS_API_URL!;
const APIKey = process.env.RESAS_API_KEY!;

export const Endpoints = {
  prefectures: `${BasePath}/api/v1/prefectures`,
  population: `${BasePath}/api/v1/population/composition/perYear`,
};

export const headers = {
  'X-API-KEY': APIKey,
};
