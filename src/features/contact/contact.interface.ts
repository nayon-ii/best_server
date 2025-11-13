// src/features/contact/contact.interface.ts
import { Document, Model, Types } from 'mongoose';

export interface IAddress {
  line1: string;
  line2?: string;
  line3?: string;
}

export interface ISocialMedia {
  facebook: string;
  twitter: string;
  linkedin: string;
}

export interface IContact extends Document {
  _id: Types.ObjectId;
  email: string;
  phone: string;
  address: IAddress;
  socialMedia: ISocialMedia;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactModel extends Model<IContact> {
  getContactInfo(): Promise<IContact | null>;
}

