import { Document, Model, Types } from "mongoose";
import { STATUS, USER_ROLE } from "../../shared/enums/user";

export interface IAuthentication {
  isResetPassword: boolean;
  oneTimeCode?: number;
  expireAt?: Date;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  profileImage?: string;
  role: USER_ROLE;
  status: STATUS;
  verified: boolean;
  isOnline?: boolean;
  isSubscribed?: boolean;
  authentication?: IAuthentication;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
  isExistUserById(id: string): Promise<IUser | null>;
  isExistUserByEmail(email: string): Promise<IUser | null>;
  isAccountCreated(id: string): Promise<IUser | null>;
  isMatchPassword(password: string, hashPassword: string): Promise<boolean>;
}

export interface IUserFilters {
  searchTerm?: string;
  role?: USER_ROLE;
  status?: STATUS;
  verified?: boolean;
  isSubscribed?: boolean;
  startDate?: string;
  endDate?: string;
}
