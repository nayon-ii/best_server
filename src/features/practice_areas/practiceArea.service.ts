// src/features/practice_areas/practiceArea.service.ts
import { StatusCodes } from 'http-status-codes';
import AppError from '../../shared/errors/AppError';
import { IPracticeArea } from './practiceArea.interface';
import { PracticeArea } from './practiceArea.model';
import QueryBuilder from '../../shared/utils/QueryBuilder';

const createPracticeAreaIntoDB = async (
  payload: Partial<IPracticeArea>
): Promise<IPracticeArea> => {
  const practiceArea = await PracticeArea.create(payload);

  if (!practiceArea) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to create practice area'
    );
  }

  return practiceArea;
};

const getAllPracticeAreasFromDB = async (query: Record<string, unknown>) => {
  const practiceAreaQuery = new QueryBuilder(
    PracticeArea.find(),
    query
  )
    .search(['title', 'description'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await practiceAreaQuery.modelQuery.lean({ virtuals: true });
  const meta = await practiceAreaQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getPracticeAreaByIdFromDB = async (
  id: string
): Promise<IPracticeArea> => {
  const practiceArea = await PracticeArea.findById(id).lean<IPracticeArea>({
    virtuals: true,
  });

  if (!practiceArea) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Practice area not found');
  }

  return practiceArea;
};

const updatePracticeAreaIntoDB = async (
  id: string,
  payload: Partial<IPracticeArea>
): Promise<IPracticeArea> => {
  const practiceArea = await PracticeArea.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true }
  ).lean<IPracticeArea>({ virtuals: true });

  if (!practiceArea) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Practice area not found');
  }

  return practiceArea;
};

const deletePracticeAreaFromDB = async (id: string): Promise<void> => {
  const practiceArea = await PracticeArea.findByIdAndDelete(id);

  if (!practiceArea) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Practice area not found');
  }
};

export const PracticeAreaService = {
  createPracticeAreaIntoDB,
  getAllPracticeAreasFromDB,
  getPracticeAreaByIdFromDB,
  updatePracticeAreaIntoDB,
  deletePracticeAreaFromDB,
};

