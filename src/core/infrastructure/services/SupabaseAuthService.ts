import { createClient } from "@infrastructure/lib/supabase/server";
import { IAuthService, AuthUser } from "@application/interfaces/IAuthService";
import { DomainError } from "@domain/errors/DomainError";

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
      if (error.message.includes("already registered")) {
        throw new DomainError("EMAIL_ALREADY_EXISTS");
      }
      throw new DomainError("AUTH_ERROR", error.message);
    }

    if (!data.user) throw new DomainError("AUTH_ERROR");

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

    if (error || !data.user || !data.session) {
      throw new DomainError("INVALID_CREDENTIALS");
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
    // Nota: El borrado de usuarios sigue requiriendo privilegios de admin
    // En un flujo normal de SSR, esto se haría vía una API route o un service role client
    // Por ahora, lo dejamos como placeholder o implementamos un client admin si es crítico
    console.warn("deleteUser requiere privilegios de admin y no está disponible en el flujo SSR estándar");
  }

  async verifyToken(token: string): Promise<AuthUser> {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) throw new DomainError("INVALID_TOKEN");

    return {
      id: user.id,
      email: user.email!,
    };
  }
}
