// Simple, direct error message mapping
export const errorMessages: Record<string, string> = {
  // Auth
  AUTH_INVALID_CREDENTIALS: "Credenciales inválidas",
  AUTH_EMAIL_ALREADY_EXISTS: "Este correo electrónico ya está registrado",
  AUTH_EMAIL_NOT_CONFIRMED: "Por favor confirma tu correo electrónico antes de iniciar sesión",
  AUTH_FAILED: "Ocurrió un error de autenticación",
  AUTH_INVALID_TOKEN: "Token inválido o expirado",
  AUTH_REGISTRATION_FAILED: "Error al crear la cuenta. Por favor intenta nuevamente",

  // Business
  BUSINESS_NOT_FOUND: "Perfil de negocio no encontrado",

  // Appointment
  APPOINTMENT_TIME_SLOT_UNAVAILABLE: "Este horario no está disponible",
  APPOINTMENT_NOT_FOUND: "Cita no encontrada",
  APPOINTMENT_ALREADY_CANCELLED: "Esta cita ya fue cancelada",

  // Generic
  GENERIC_NOT_FOUND: "Recurso no encontrado",
  GENERIC_CONFLICT: "Conflicto con el recurso",
  GENERIC_UNAUTHORIZED: "No tienes permiso para realizar esta acción",
  GENERIC_VALIDATION_FAILED: "Datos inválidos",

  // Fallback
  UNKNOWN_ERROR: "Ocurrió un error inesperado",
  NETWORK_ERROR: "Error de conexión",
  INTERNAL_ERROR: "Error interno del servidor",
};
