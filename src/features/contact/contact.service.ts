// src/features/contact/contact.service.ts
import { StatusCodes } from 'http-status-codes';
import AppError from '../../shared/errors/AppError';
import { IContact } from './contact.interface';
import { Contact } from './contact.model';

const getContactInfoFromDB = async (): Promise<IContact> => {
  let contactInfo = await Contact.getContactInfo();

  // If no contact info exists, create default one
  if (!contactInfo) {
    contactInfo = await Contact.create({
      email: 'info@example.com',
      phone: '',
      address: {
        line1: '',
        line2: '',
        line3: '',
      },
      socialMedia: {
        facebook: '',
        twitter: '',
        linkedin: '',
      },
    });
  }

  return contactInfo;
};

const updateContactInfoIntoDB = async (
  payload: Partial<IContact>
): Promise<IContact> => {
  // Get existing contact info or create if doesn't exist
  let contactInfo = await Contact.getContactInfo();

  if (!contactInfo) {
    // Create new contact info
    contactInfo = await Contact.create(payload);
  } else {
    // Update existing contact info
    contactInfo = await Contact.findByIdAndUpdate(
      contactInfo._id,
      payload,
      { new: true, runValidators: true }
    ).lean<IContact>({ virtuals: true });
  }

  if (!contactInfo) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to update contact information'
    );
  }

  return contactInfo;
};

export const ContactService = {
  getContactInfoFromDB,
  updateContactInfoIntoDB,
};

