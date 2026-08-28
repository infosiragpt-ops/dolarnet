export function authErrorMessage(code?: string) {
  switch (code) {
    case "config":
    case "Configuration":
      return "Google OAuth no está configurado. Define AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET y AUTH_URL en .env.local.";
    case "AccessDenied":
      return "Google rechazó el acceso. Vuelve a intentarlo o usa otra cuenta.";
    case "OAuthCallback":
    case "Callback":
      return "No se pudo completar el retorno de Google. Revisa que el callback sea /api/auth/callback/google.";
    case "OAuthAccountNotLinked":
      return "Ese correo ya está asociado a otro método de acceso.";
    default:
      return code
        ? "No se pudo iniciar sesión con Google. Revisa la configuración e inténtalo de nuevo."
        : null;
  }
}
