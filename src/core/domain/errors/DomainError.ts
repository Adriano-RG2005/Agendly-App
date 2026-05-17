export class DomainError extends Error {
  constructor(
    public readonly code: string,
    message?: string
  ) {
    super(message ?? code)
    this.name = 'DomainError'
  }
}

export class NotFoundError extends DomainError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`)
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends DomainError {
  constructor(message: string) {
    super('CONFLICT', message)
    this.name = 'ConflictError'
  }
}

export class UnauthorizedError extends DomainError {
  constructor() {
    super('UNAUTHORIZED', 'Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message)
    this.name = 'ValidationError'
  }
}