export interface CognitoUser {
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_number_verified: boolean;
  sub: string;
  username: string;
  id: string;
}
