// src/features/contact/contact.model.ts
import { model, Schema } from "mongoose";
import {
  IContact,
  ContactModel,
  IAddress,
  ISocialMedia,
} from "./contact.interface";

const addressSchema = new Schema<IAddress>(
  {
    line1: {
      type: String,
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
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const contactSchema = new Schema<IContact, ContactModel>(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: addressSchema,
    },
    socialMedia: {
      type: socialMediaSchema,
    },
  },
  { timestamps: true, versionKey: false }
);

// Static method to get contact info (singleton pattern)
contactSchema.statics.getContactInfo =
  async function (): Promise<IContact | null> {
    return await this.findOne();
  };

export const Contact = model<IContact, ContactModel>("Contact", contactSchema);
