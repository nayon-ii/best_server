// src/features/insights/insight.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../shared/utils/catchAsync';
import sendResponse from '../../shared/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { InsightService } from './insight.service';

const createInsight = catchAsync(async (req: Request, res: Response) => {
  const result = await InsightService.createInsightIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Insight created successfully',
    data: result,
  });
});

const getAllInsights = catchAsync(async (req: Request, res: Response) => {
  const result = await InsightService.getAllInsightsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Insights retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getInsightById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await InsightService.getInsightByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Insight retrieved successfully',
    data: result,
  });
});

const updateInsight = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await InsightService.updateInsightIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Insight updated successfully',
    data: result,
  });
});

const deleteInsight = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await InsightService.deleteInsightFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Insight deleted successfully',
  });
});

export const InsightController = {
  createInsight,
  getAllInsights,
  getInsightById,
  updateInsight,
  deleteInsight,
};

