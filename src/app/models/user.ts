import { UserRole } from '../enums/enum';

export class UserSignupRequest {
  userName!: string;
  email!: string;
  password!: string;
}

export class UserSignupRespone {
  id!: string;
  email!: string;
  userName!: string;
}
export class LoginRequest {
  usernameOrEmail!: string;
  password!: string;
}

export class LoginResponse {
  token!: string;
  email!: string;
  userRole!: UserRole;
}

export class LoggedInCredentials {
  email!: string;
  token!: string;
  userRole!: UserRole;
}

export class UserDetails {
  userName!: string;
  email!: string;
  id!: string;
}

export class ChangePasswordRequest {
  oldPassword!: string;
  newPassword!: string;
}
