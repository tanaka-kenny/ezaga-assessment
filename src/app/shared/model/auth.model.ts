export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface AuthRequest {
    email: string;
    password: string;
  }

export interface RegisterRequest {
    firstname: string;
    lastname: string;
    password: string;
    role: string;
}