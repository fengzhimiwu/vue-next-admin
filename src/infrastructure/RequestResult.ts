export class RequestResult<T> {
  data: T;
  totalCount: number;
  hasError: boolean;
  errorMessage: string;

  constructor(data: T, totalCount: number, hasError: boolean, errorMessage: string) {
    this.data = data;
    this.totalCount = totalCount;
    this.hasError = hasError;
    this.errorMessage = errorMessage;
  }
}
