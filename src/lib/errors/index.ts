import { errorMessages } from "./messages";

/**
 * Get a safe, readable message for any error
 */
export function getErrorMessage(error: unknown): string {
  // 1. Domain errors (or any error with a 'code' property)
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = String((error as { code: unknown }).code);
    if (errorMessages[code]) return errorMessages[code];
  }

  // 2. Native Error objects - log for debugging
  if (error instanceof Error) {
    console.error("Unexpected error:", error);
    // Check for network-related errors
    if (error.name === "NetworkError" || error.message.includes("fetch")) {
      return errorMessages.NETWORK_ERROR;
    }
    return errorMessages.INTERNAL_ERROR;
  }

  // 3. String error codes
  if (typeof error === "string") {
    return errorMessages[error] || errorMessages.UNKNOWN_ERROR;
  }

  // 4. Everything else
  console.error("Unknown error type:", error);
  return errorMessages.UNKNOWN_ERROR;
}

// Re-export error messages for convenience
export { errorMessages };
