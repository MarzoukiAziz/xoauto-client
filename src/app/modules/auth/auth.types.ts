export interface CognitoUser {
  email: string;
  email_verified: boolean; // Change to boolean for easier handling
  phone_number: string;
  phone_number_verified: boolean; // Change to boolean for easier handling
  sub: string;
  username: string;
}
