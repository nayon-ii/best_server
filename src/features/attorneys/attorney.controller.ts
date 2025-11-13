// src/features/attorneys/attorney.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../shared/utils/catchAsync';
import sendResponse from '../../shared/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { AttorneyService } from './attorney.service';

const createAttorney = catchAsync(async (req: Request, res: Response) => {
  const result = await AttorneyService.createAttorneyIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Attorney created successfully',
    data: result,
  });
});

const getAllAttorneys = catchAsync(async (req: Request, res: Response) => {
  const result = await AttorneyService.getAllAttorneysFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Attorneys retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAttorneyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AttorneyService.getAttorneyByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Attorney retrieved successfully',
    data: result,
  });
});

const updateAttorney = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AttorneyService.updateAttorneyIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Attorney updated successfully',
    data: result,
  });
});

const deleteAttorney = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AttorneyService.deleteAttorneyFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Attorney deleted successfully',
  });
});

export const AttorneyController = {
  createAttorney,
  getAllAttorneys,
  getAttorneyById,
  updateAttorney,
  deleteAttorney,
};

