// src/features/attorneys/attorney.interface.ts
import { Document, Model, Types } from "mongoose";
import { STATUS } from "../../shared/enums/user";

export interface ILocation {
  line1: string;
  line2?: string;
  line3?: string;
}

export interface ISocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

export interface IAttorney extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  designation?: string;
  location: ILocation;
  biography: string;
  role?: string;
  profileImage?: string;
  bannerImage?: string;
  education: string[];
  barAdmission: string[];
  professionalMemberships: string[];
  socialLinks?: ISocialLinks;
  status: STATUS;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttorneyModel extends Model<IAttorney> {
  isExistAttorneyById(id: string): Promise<IAttorney | null>;
  isExistAttorneyByEmail(email: string): Promise<IAttorney | null>;
}

export interface IAttorneyFilters {
  searchTerm?: string;
  status?: STATUS;
  designation?: string;
  startDate?: string;
  endDate?: string;
}
