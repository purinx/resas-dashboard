export type ErrorKey =
  | 'ResasPrefecturesFetchError'
  | 'ResasPrefectureParseError'
  | 'ResasPopulationFetchError'
  | 'ResasPopulationParseError';

export class AppError extends Error {
  constructor(
    public key: ErrorKey,
    public message: string,
  ) {
    super(message);
  }
}
