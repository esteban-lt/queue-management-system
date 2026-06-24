export class ResponseError extends Error {

  constructor(public readonly statusCode: number, message: string) {
    super(message);
  }

  public static badRequest(message: string = 'Bad request') {
    return new ResponseError(400, message);
  }

  public static unauthorized(message: string = 'Unauthorized') {
    return new ResponseError(401, message);
  }

  public static forbidden(message: string = 'Forbidden') {
    return new ResponseError(403, message);
  }

  public static notFound(message: string = 'Not found') {
    return new ResponseError(404, message);
  }

  public static internalServerError(message: string = 'Internal server error') {
    return new ResponseError(500, message);
  }
}
