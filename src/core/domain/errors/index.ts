
// Base domain error
export class DomainError extends Error {
  public readonly code: string;

  constructor(code: string, message?: string) {
    super(message ?? code);
    this.name = "DomainError";
    this.code = code;
  }
}

// --- Auth ---
export class InvalidCredentialsError extends DomainError {
  constructor() {
    super("AUTH_INVALID_CREDENTIALS");
    this.name = "InvalidCredentialsError";
  }
}

export class EmailAlreadyExistsError extends DomainError {
  constructor() {
    super("AUTH_EMAIL_ALREADY_EXISTS");
    this.name = "EmailAlreadyExistsError";
  }
}

export class EmailNotConfirmedError extends DomainError {
  constructor() {
    super("AUTH_EMAIL_NOT_CONFIRMED");
    this.name = "EmailNotConfirmedError";
  }
}

export class AuthFailedError extends DomainError {
  constructor() {
    super("AUTH_FAILED");
    this.name = "AuthFailedError";
  }
}

export class InvalidTokenError extends DomainError {
  constructor() {
    super("AUTH_INVALID_TOKEN");
    this.name = "InvalidTokenError";
  }
}

export class RegistrationFailedError extends DomainError {
  constructor() {
    super("AUTH_REGISTRATION_FAILED");
    this.name = "RegistrationFailedError";
  }
}

// --- Business ---
export class BusinessNotFoundError extends DomainError {
  constructor() {
    super("BUSINESS_NOT_FOUND");
    this.name = "BusinessNotFoundError";
  }
}

// --- Appointment ---
export class TimeSlotUnavailableError extends DomainError {
  constructor() {
    super("APPOINTMENT_TIME_SLOT_UNAVAILABLE");
    this.name = "TimeSlotUnavailableError";
  }
}

export class AppointmentNotFoundError extends DomainError {
  constructor() {
    super("APPOINTMENT_NOT_FOUND");
    this.name = "AppointmentNotFoundError";
  }
}

export class AppointmentAlreadyCancelledError extends DomainError {
  constructor() {
    super("APPOINTMENT_ALREADY_CANCELLED");
    this.name = "AppointmentAlreadyCancelledError";
  }
}

// --- Generic ---
export class NotFoundError extends DomainError {
  constructor(public readonly resource: string) {
    super("GENERIC_NOT_FOUND", `${resource} not found`);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends DomainError {
  constructor(public readonly details: string) {
    super("GENERIC_CONFLICT", details);
    this.name = "ConflictError";
  }
}

export class UnauthorizedError extends DomainError {
  constructor() {
    super("GENERIC_UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class ValidationFailedError extends DomainError {
  constructor(
    public readonly message: string,
    public readonly field?: string,
  ) {
    super("GENERIC_VALIDATION_FAILED", message);
    this.name = "ValidationFailedError";
  }
}
