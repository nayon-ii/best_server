// src/features/practice_areas/practiceArea.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../shared/utils/catchAsync';
import sendResponse from '../../shared/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { PracticeAreaService } from './practiceArea.service';

const createPracticeArea = catchAsync(async (req: Request, res: Response) => {
  const result = await PracticeAreaService.createPracticeAreaIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Practice area created successfully',
    data: result,
  });
});

const getAllPracticeAreas = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PracticeAreaService.getAllPracticeAreasFromDB(
      req.query
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Practice areas retrieved successfully',
      meta: result.meta,
      data: result.result,
    });
  }
);

const getPracticeAreaById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PracticeAreaService.getPracticeAreaByIdFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Practice area retrieved successfully',
      data: result,
    });
  }
);

const updatePracticeArea = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PracticeAreaService.updatePracticeAreaIntoDB(
      id,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Practice area updated successfully',
      data: result,
    });
  }
);

const deletePracticeArea = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await PracticeAreaService.deletePracticeAreaFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Practice area deleted successfully',
    });
  }
);

export const PracticeAreaController = {
  createPracticeArea,
  getAllPracticeAreas,
  getPracticeAreaById,
  updatePracticeArea,
  deletePracticeArea,
};

