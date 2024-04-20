export class AppError extends Error {
  public status: number;
  constructor(status = 500, message = "") {
    super();
    if (status === EErrorStatus.BadRequestError) {
      this.name = "Bad request";
      this.message = message || "Bad request";
    }
    if (status === EErrorStatus.AuthorizationError) {
      (this.name = "Unauthorized"), (this.message = message || "Unauthorized");
    }
    if (status === EErrorStatus.ValidationError) {
      this.name = "Validation Error";
      this.message = message || "Validation Failed";
    }
    if (status === EErrorStatus.InternalServerError) {
      this.name = "Internal Server Error";
      this.message = message || "Internal Server Error";
    }
    if (status === EErrorStatus.NotFoundError) {
      this.name = "Not Found";
      this.message = message || "Not Found";
    }
    this.status = status;
  }
}

export enum EErrorStatus {
  BadRequestError = 400,
  AuthorizationError = 401,
  ValidationError = 403,
  NotFoundError = 404,
  InternalServerError = 500,
}
