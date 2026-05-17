export class HttpResponse {
  static ok<T>(data: T): Response {
    return Response.json({ data }, { status: 200 });
  }

  static created<T>(data: T): Response {
    return Response.json({ data }, { status: 201 });
  }

  static noContent(): Response {
    return new Response(null, { status: 204 });
  }

  static badRequest(message: string): Response {
    return Response.json(
      { error: { code: "BAD_REQUEST", message } },
      { status: 400 },
    );
  }

  static unauthorized(): Response {
    return Response.json(
      { error: { code: "UNAUTHORIZED", message: "Unauthorized" } },
      { status: 401 },
    );
  }

  static notFound(resource: string): Response {
    return Response.json(
      { error: { code: "NOT_FOUND", message: `${resource} not found` } },
      { status: 404 },
    );
  }

  static conflict(message: string): Response {
    return Response.json(
      { error: { code: "CONFLICT", message } },
      { status: 409 },
    );
  }

  static unprocessable(message: string): Response {
    return Response.json(
      { error: { code: "VALIDATION_ERROR", message } },
      { status: 422 },
    );
  }

  static internal(): Response {
    return Response.json(
      { error: { code: "INTERNAL_ERROR", message: "Internal server error" } },
      { status: 500 },
    );
  }
}
