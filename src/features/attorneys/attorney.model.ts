// src/features/attorneys/attorney.model.ts
import { model, Schema } from "mongoose";
import {
  IAttorney,
  AttorneyModel,
  ILocation,
  ISocialLinks,
} from "./attorney.interface";
import { STATUS, USER_ROLE } from "../../shared/enums/user";

const locationSchema = new Schema<ILocation>(
  {
    line1: {
      type: String,
      required: [true, "Address line 1 is required"],
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

const socialLinksSchema = new Schema<ISocialLinks>(
  {
    facebook: {
      type: String,
      trim: true,
      default: null,
    },
    twitter: {
      type: String,
      trim: true,
      default: null,
    },
    linkedin: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { _id: false }
);

const attorneySchema = new Schema<IAttorney, AttorneyModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
      index: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    designation: {
      type: String,
      required: false,
      trim: true,
      index: true,
    },
    role: {
      type: String,
      enum: {
        values: Object.values(USER_ROLE),
        message: "{VALUE} is not a valid role",
      },
      default: USER_ROLE.MEMBER,
      required: false,
    },
    location: {
      type: locationSchema,
      required: [true, "Location is required"],
    },
    biography: {
      type: String,
      required: [true, "Biography is required"],
      trim: true,
      minlength: [10, "Biography must be at least 10 characters"],
    },
    profileImage: {
      type: String,
      trim: true,
      default: null,
    },
    bannerImage: {
      type: String,
      trim: true,
      default: null,
    },
    education: {
      type: [String],
      default: [],
    },
    barAdmission: {
      type: [String],
      default: [],
    },
    professionalMemberships: {
      type: [String],
      default: [],
    },
    socialLinks: {
      type: socialLinksSchema,
      default: null,
    },
    status: {
      type: String,
      enum: {
        values: [STATUS.ACTIVE, STATUS.INACTIVE],
        message: "{VALUE} is not a valid status",
      },
      default: STATUS.ACTIVE,
      index: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// Static method to check if attorney exists by ID
attorneySchema.statics.isExistAttorneyById = async function (
  id: string
): Promise<IAttorney | null> {
  return await this.findById(id);
};

// Static method to check if attorney exists by email
attorneySchema.statics.isExistAttorneyByEmail = async function (
  email: string
): Promise<IAttorney | null> {
  return await this.findOne({ email: email.toLowerCase() });
};

export const Attorney = model<IAttorney, AttorneyModel>(
  "Attorney",
  attorneySchema
);
