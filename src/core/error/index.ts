export class AppError extends Error {
  public status: number;
  constructor(status = 500) {
    super();
    if (status === EErrorStatus.BadRequestError) {
      this.name = "Bad request";
      this.message = "Bad request";
    }
    if (status === EErrorStatus.AuthorizationError) {
      (this.name = "Unauthorized"), (this.message = "Unauthorized");
    }
    if (status === EErrorStatus.ValidationError) {
      this.name = "Validation Error";
      this.message = "Validation Failed";
    }
    if (status === EErrorStatus.InternalServerError) {
      this.name = "Internal Server Error";
      this.message = "Internal Server Error";
    }
    this.status = status;
  }
}

export enum EErrorStatus {
  BadRequestError = 400,
  AuthorizationError = 401,
  ValidationError = 403,
  InternalServerError = 500,
}
