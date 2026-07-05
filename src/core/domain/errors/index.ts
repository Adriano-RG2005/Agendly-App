
// --- PURE DOMAIN ERRORS ---
// No presentation, infrastructure, or application concerns here!
// Only what makes sense for the business domain.

/**
 * Base class for all domain errors
 */
export class DomainError extends Error {
  public readonly code: string;

  constructor(code: string, message?: string) {
    super(message ?? code);
    this.name = "DomainError";
    this.code = code;
  }
}

// --- Authentication & User Domain Errors ---
export namespace AuthErrors {
  /**
   * Error when credentials are invalid
   */
  export class InvalidCredentials extends DomainError {
    constructor() {
      super("AUTH_INVALID_CREDENTIALS");
      this.name = "InvalidCredentialsError";
    }
  }

  /**
   * Error when email is already registered
   */
  export class EmailAlreadyExists extends DomainError {
    constructor() {
      super("AUTH_EMAIL_ALREADY_EXISTS");
      this.name = "EmailAlreadyExistsError";
    }
  }

  /**
   * Error when email hasn't been confirmed yet
   */
  export class EmailNotConfirmed extends DomainError {
    constructor() {
      super("AUTH_EMAIL_NOT_CONFIRMED");
      this.name = "EmailNotConfirmedError";
    }
  }

  /**
   * Error when authentication fails unexpectedly
   */
  export class AuthFailed extends DomainError {
    constructor() {
      super("AUTH_FAILED");
      this.name = "AuthFailedError";
    }
  }

  /**
   * Error when token is invalid or expired
   */
  export class InvalidToken extends DomainError {
    constructor() {
      super("AUTH_INVALID_TOKEN");
      this.name = "InvalidTokenError";
    }
  }

  /**
   * Error when user registration fails
   */
  export class RegistrationFailed extends DomainError {
    constructor() {
      super("AUTH_REGISTRATION_FAILED");
      this.name = "RegistrationFailedError";
    }
  }
}

// --- Business Domain Errors ---
export namespace BusinessErrors {
  /**
   * Error when business profile isn't found
   */
  export class NotFound extends DomainError {
    constructor() {
      super("BUSINESS_NOT_FOUND");
      this.name = "BusinessNotFoundError";
    }
  }
}

// --- Appointment Domain Errors ---
export namespace AppointmentErrors {
  /**
   * Error when requested time slot is unavailable
   */
  export class TimeSlotUnavailable extends DomainError {
    constructor() {
      super("APPOINTMENT_TIME_SLOT_UNAVAILABLE");
      this.name = "TimeSlotUnavailableError";
    }
  }

  /**
   * Error when appointment isn't found
   */
  export class NotFound extends DomainError {
    constructor() {
      super("APPOINTMENT_NOT_FOUND");
      this.name = "AppointmentNotFoundError";
    }
  }

  /**
   * Error when trying to cancel an already cancelled appointment
   */
  export class AlreadyCancelled extends DomainError {
    constructor() {
      super("APPOINTMENT_ALREADY_CANCELLED");
      this.name = "AppointmentAlreadyCancelledError";
    }
  }
}

// --- Generic Domain Errors ---
export namespace GenericErrors {
  /**
   * Error when a requested resource isn't found
   */
  export class NotFound extends DomainError {
    constructor(public readonly resourceName: string) {
      super("GENERIC_NOT_FOUND", `${resourceName} not found`);
      this.name = "NotFoundError";
    }
  }

  /**
   * Error when there's a conflict with an existing resource
   */
  export class Conflict extends DomainError {
    constructor(public readonly details: string) {
      super("GENERIC_CONFLICT", details);
      this.name = "ConflictError";
    }
  }

  /**
   * Error when user isn't authorized to perform an action
   */
  export class Unauthorized extends DomainError {
    constructor() {
      super("GENERIC_UNAUTHORIZED");
      this.name = "UnauthorizedError";
    }
  }

  /**
   * Error when input validation fails
   */
  export class ValidationFailed extends DomainError {
    constructor(public readonly field?: string, message?: string) {
      super("GENERIC_VALIDATION_FAILED", message ?? "Validation failed");
      this.name = "ValidationFailedError";
    }
  }
}
