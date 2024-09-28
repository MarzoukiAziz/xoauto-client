export interface User {
  _id: string;
  name: string;
  email: string;
  phone_number?: string;
  avatar?: string;
  pro?: boolean;
  roles?: string[];
  email_verified?: boolean;
  phone_number_verified?: boolean;
  favorite_ads?: string[];
  enable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}
