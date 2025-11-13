// src/features/insights/insight.service.ts
import { StatusCodes } from 'http-status-codes';
import AppError from '../../shared/errors/AppError';
import { IInsight } from './insight.interface';
import { Insight } from './insight.model';
import QueryBuilder from '../../shared/utils/QueryBuilder';

const createInsightIntoDB = async (
  payload: Partial<IInsight>
): Promise<IInsight> => {
  const insight = await Insight.create(payload);

  if (!insight) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to create insight'
    );
  }

  return insight;
};

const getAllInsightsFromDB = async (query: Record<string, unknown>) => {
  const insightQuery = new QueryBuilder(
    Insight.find(),
    query
  )
    .search(['title', 'type', 'description', 'outcome'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await insightQuery.modelQuery.lean({ virtuals: true });
  const meta = await insightQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getInsightByIdFromDB = async (id: string): Promise<IInsight> => {
  const insight = await Insight.findById(id).lean<IInsight>({
    virtuals: true,
  });

  if (!insight) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Insight not found');
  }

  return insight;
};

const updateInsightIntoDB = async (
  id: string,
  payload: Partial<IInsight>
): Promise<IInsight> => {
  const insight = await Insight.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true }
  ).lean<IInsight>({ virtuals: true });

  if (!insight) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Insight not found');
  }

  return insight;
};

const deleteInsightFromDB = async (id: string): Promise<void> => {
  const insight = await Insight.findByIdAndDelete(id);

  if (!insight) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Insight not found');
  }
};

export const InsightService = {
  createInsightIntoDB,
  getAllInsightsFromDB,
  getInsightByIdFromDB,
  updateInsightIntoDB,
  deleteInsightFromDB,
};

