// src/features/contact/contact.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../shared/utils/catchAsync';
import sendResponse from '../../shared/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { ContactService } from './contact.service';

const getContactInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.getContactInfoFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Contact information retrieved successfully',
    data: result,
  });
});

const updateContactInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.updateContactInfoIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Contact information updated successfully',
    data: result,
  });
});

export const ContactController = {
  getContactInfo,
  updateContactInfo,
};

