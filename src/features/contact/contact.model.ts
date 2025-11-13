// src/features/contact/contact.model.ts
import { model, Schema } from 'mongoose';
import { IContact, ContactModel, IAddress, ISocialMedia } from './contact.interface';

const addressSchema = new Schema<IAddress>(
  {
    line1: {
      type: String,
      required: [true, 'Address line 1 is required'],
      trim: true,
    },
    line2: {
      type: String,
      trim: true,
      default: null,
    },
    line3: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { _id: false }
);

const socialMediaSchema = new Schema<ISocialMedia>(
  {
    facebook: {
      type: String,
      required: [true, 'Facebook URL is required'],
      trim: true,
    },
    twitter: {
      type: String,
      required: [true, 'Twitter URL is required'],
      trim: true,
    },
    linkedin: {
      type: String,
      required: [true, 'LinkedIn URL is required'],
      trim: true,
    },
  },
  { _id: false }
);

const contactSchema = new Schema<IContact, ContactModel>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    address: {
      type: addressSchema,
      required: [true, 'Address is required'],
    },
    socialMedia: {
      type: socialMediaSchema,
      required: [true, 'Social media links are required'],
    },
  },
  { timestamps: true, versionKey: false }
);

// Static method to get contact info (singleton pattern)
contactSchema.statics.getContactInfo = async function (): Promise<IContact | null> {
  return await this.findOne();
};

export const Contact = model<IContact, ContactModel>(
  'Contact',
  contactSchema
);

