
// --- USER-FRIENDLY ERROR MESSAGES ---
// Presentation layer concern only!
// Maps domain error codes to Spanish, user-friendly messages.
// No business logic here.

export const USER_FRIENDLY_ERRORS: Record<string, string> = {
  // Auth Errors
  AUTH_INVALID_CREDENTIALS: "Credenciales inválidas",
  AUTH_EMAIL_ALREADY_EXISTS: "Este correo electrónico ya está registrado",
  AUTH_EMAIL_NOT_CONFIRMED: "Por favor confirma tu correo electrónico antes de iniciar sesión",
  AUTH_FAILED: "Ocurrió un error de autenticación",
  AUTH_INVALID_TOKEN: "Token inválido o expirado",
  AUTH_REGISTRATION_FAILED: "Error al crear la cuenta. Por favor intenta nuevamente.",

  // Generic Errors
  GENERIC_NOT_FOUND: "Recurso no encontrado",
  GENERIC_CONFLICT: "Conflicto con el recurso",
  GENERIC_UNAUTHORIZED: "No tienes permiso para realizar esta acción",
  GENERIC_VALIDATION_FAILED: "Datos inválidos",

  // Business Errors
  BUSINESS_NOT_FOUND: "Perfil de negocio no encontrado",

  // Appointment Errors
  APPOINTMENT_TIME_SLOT_UNAVAILABLE: "Este horario no está disponible",
  APPOINTMENT_NOT_FOUND: "Cita no encontrada",
  APPOINTMENT_ALREADY_CANCELLED: "Esta cita ya fue cancelada",

  // Fallback Errors
  UNKNOWN_ERROR: "Ocurrió un error inesperado",
  NETWORK_ERROR: "Error de conexión",
  INTERNAL_ERROR: "Error interno del servidor",
};
