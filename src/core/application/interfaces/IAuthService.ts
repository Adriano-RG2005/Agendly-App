export interface AuthUser {
  id: string;
  email: string;
}

export interface IAuthService {
  signUp(props: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthUser>;

  signIn(props: {
    email: string;
    password: string;
  }): Promise<{ user: AuthUser; token: string }>;

  deleteUser(id: string): Promise<void>;
  verifyToken(token: string): Promise<AuthUser>;
}
