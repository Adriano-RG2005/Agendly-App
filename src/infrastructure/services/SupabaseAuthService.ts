import { supabaseAdmin } from "@infrastructure/lib/supabase";
import { IAuthService, AuthUser } from "@application/interfaces/IAuthService";
import { DomainError } from "@domain/errors/DomainError";

export class SupabaseAuthService implements IAuthService {
  async signUp(props: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthUser> {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: props.email,
      password: props.password,
      user_metadata: { name: props.name },
      email_confirm: true,
    });

    if (error) {
      if (error.message.includes("already registered")) {
        throw new DomainError("EMAIL_ALREADY_EXISTS");
      }

      throw new DomainError("AUTH_ERROR");
    }

    return {
      id: data.user.id,
      email: data.user.email!,
    };
  }

  async signIn(props: {
    email: string;
    password: string;
  }): Promise<{ user: AuthUser; token: string }> {
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email: props.email,
      password: props.password,
    });

    if (error) throw new DomainError("INVALID_CREDENTIALS");

    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
      },
      token: data.session.access_token,
    };
  }

  async deleteUser(id: string): Promise<void> {
    await supabaseAdmin.auth.admin.deleteUser(id);
  }

  async verifyToken(token: string): Promise<AuthUser> {
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data.user) throw new DomainError("INVALID_TOKEN");

    return {
      id: data.user.id,
      email: data.user.email!,
    };
  }
}
