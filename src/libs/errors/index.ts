export type ErrorKey = 'ResasPrefecturesFetchError' | 'ResasPrefectureParseError';

export class AppError extends Error {
  constructor(
    public key: ErrorKey,
    public message: string,
  ) {
    super(message);
  }
}
