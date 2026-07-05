
// --- ERROR HANDLERS ---
// Presentation layer concern!
// Takes any error (domain, network, etc.) and returns a safe user message.

import { DomainError } from "@/core/domain/errors";
import { USER_FRIENDLY_ERRORS } from "./messages";

/**
 * Get a safe, user-friendly message from ANY error type
 */
export function getUserFriendlyMessage(error: unknown): string {
  // 1. Handle DomainError instances
  if (isDomainError(error)) {
    // Check if we have a specific message for this error code
    if (USER_FRIENDLY_ERRORS[error.code]) {
      return USER_FRIENDLY_ERRORS[error.code];
    }
    // Fallback for generic domain errors with internal message
    return error.message || USER_FRIENDLY_ERRORS.UNKNOWN_ERROR;
  }

  // 2. Handle native Error objects
  if (error instanceof Error) {
    console.error("Unexpected error:", error); // Log for debugging
    // Check for network-related errors
    if (error.name === "NetworkError" || error.message.includes("fetch")) {
      return USER_FRIENDLY_ERRORS.NETWORK_ERROR;
    }
    // Generic internal error
    return USER_FRIENDLY_ERRORS.INTERNAL_ERROR;
  }

  // 3. Handle string error codes
  if (typeof error === "string") {
    return USER_FRIENDLY_ERRORS[error] || USER_FRIENDLY_ERRORS.UNKNOWN_ERROR;
  }

  // 4. Handle unknown error types
  console.error("Unknown error type:", error);
  return USER_FRIENDLY_ERRORS.UNKNOWN_ERROR;
}

// --- Type Guards ---

function isDomainError(error: unknown): error is DomainError {
  return (
    error instanceof Error &&
    "code" in error &&
    typeof (error as DomainError).code === "string"
  );
}
