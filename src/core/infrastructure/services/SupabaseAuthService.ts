import { createClient } from "@infrastructure/lib/supabase/server";
import { IAuthService, AuthUser } from "@application/interfaces/IAuthService";
import { AuthErrors } from "@/core/domain/errors";

// Supabase Auth error codes reference: https://supabase.com/docs/reference/javascript/auth-api-error-codes
const SUPABASE_ERROR_CODES = {
  EMAIL_NOT_CONFIRMED: "email_not_confirmed",
  INVALID_CREDENTIALS: "invalid_credentials",
  USER_NOT_FOUND: "user_not_found",
  EMAIL_ALREADY_EXISTS: "email_already_exists",
};

export class SupabaseAuthService implements IAuthService {
  async signUp(props: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthUser> {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email: props.email,
      password: props.password,
      options: {
        data: {
          name: props.name,
        },
      },
    });

    if (error) {
      if (
        error.message?.includes("already registered") ||
        error.code === SUPABASE_ERROR_CODES.EMAIL_ALREADY_EXISTS
      ) {
        throw new AuthErrors.EmailAlreadyExists();
      }
      console.error("Supabase signUp error:", error);
      throw new AuthErrors.AuthFailed();
    }

    if (!data.user) throw new AuthErrors.AuthFailed();

    return {
      id: data.user.id,
      email: data.user.email!,
    };
  }

  async signIn(props: {
    email: string;
    password: string;
  }): Promise<{ user: AuthUser; token: string }> {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: props.email,
      password: props.password,
    });

    console.log(SupabaseAuthService.name, { data, error });

    if (error) {
      if (error.code === SUPABASE_ERROR_CODES.EMAIL_NOT_CONFIRMED) {
        throw new AuthErrors.EmailNotConfirmed();
      }
      if (
        error.code === SUPABASE_ERROR_CODES.INVALID_CREDENTIALS ||
        error.code === SUPABASE_ERROR_CODES.USER_NOT_FOUND
      ) {
        throw new AuthErrors.InvalidCredentials();
      }
      console.error("Supabase signIn error:", error);
      throw new AuthErrors.AuthFailed();
    }

    if (!data.user || !data.session) {
      throw new AuthErrors.InvalidCredentials();
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
      },
      token: data.session.access_token,
    };
  }

  async deleteUser(id: string): Promise<void> {
    console.warn(
      "deleteUser requiere privilegios de admin y no está disponible en el flujo SSR estándar",
    );
  }

  async verifyToken(token: string): Promise<AuthUser> {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) throw new AuthErrors.InvalidToken();

    return {
      id: user.id,
      email: user.email!,
    };
  }
}
