export interface Register {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface VerifyEmail {
  email: string;
  code: string;
}

export interface AuthResponse {
  message: string;
  access?: string;
  refresh?: string;
  user?: AuthUser;
}

export interface AuthUser {
  onboarding_completed: any;
  role: string;
  profile_picture: any;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ApiErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
  [key: string]: unknown;
}

/** Compatibilité avec les anciens imports. */
export type verifyCode = VerifyEmail;
