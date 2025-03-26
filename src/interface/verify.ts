export interface VerificationResponse {
  message: string;
  verificationCode: string;
  instructions: string;
}

export interface SaveVerificationRequest {
  verificationCode: string;
}

export interface UsernameRequest {
  username: string;
}
