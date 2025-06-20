class ApiError extends Error {
  statusCode: number;
  data: null;
  success: false;
  errors: unknown[];

  constructor(
    statusCode: number,
    message: string = "Something went Wrong",
    errors: unknown[] = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
