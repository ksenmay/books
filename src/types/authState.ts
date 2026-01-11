import type { User } from './user';
import type { RegisterPayload } from './registerPayload';

export type RegisterResult =
  | { ok: true }
  | { ok: false; field: 'username' | 'email' };

export type AuthState = {
  user: User | null;
  isAuth: boolean;

  users: Array<User & { password: string }>;

  login: (username: string, password: string) => boolean;
  register: (data: RegisterPayload) => RegisterResult;
  logout: () => void;

  isUsernameTaken: (username: string) => boolean;
  isEmailTaken: (email: string) => boolean;

  updateProfile: (data: Partial<User['profileData']>) => void;
};
