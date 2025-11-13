// src/features/attorneys/attorney.service.ts
import { StatusCodes } from 'http-status-codes';
import AppError from '../../shared/errors/AppError';
import { IAttorney } from './attorney.interface';
import { Attorney } from './attorney.model';
import QueryBuilder from '../../shared/utils/QueryBuilder';

const createAttorneyIntoDB = async (
  payload: Partial<IAttorney>
): Promise<IAttorney> => {
  // Check if email already exists
  const emailExists = await Attorney.isExistAttorneyByEmail(payload.email!);
  if (emailExists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'An attorney with this email already exists'
    );
  }

  const attorney = await Attorney.create(payload);

  if (!attorney) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to create attorney'
    );
  }

  return attorney;
};

const getAllAttorneysFromDB = async (query: Record<string, unknown>) => {
  const attorneyQuery = new QueryBuilder(
    Attorney.find(),
    query
  )
    .search(['name', 'email', 'designation', 'biography'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await attorneyQuery.modelQuery.lean({ virtuals: true });
  const meta = await attorneyQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getAttorneyByIdFromDB = async (id: string): Promise<IAttorney> => {
  const attorney = await Attorney.findById(id).lean<IAttorney>({
    virtuals: true,
  });

  if (!attorney) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Attorney not found');
  }

  return attorney;
};

const updateAttorneyIntoDB = async (
  id: string,
  payload: Partial<IAttorney>
): Promise<IAttorney> => {
  // If email is being updated, check if it already exists for another attorney
  if (payload.email) {
    const existingAttorney = await Attorney.isExistAttorneyByEmail(
      payload.email
    );
    if (existingAttorney && existingAttorney._id.toString() !== id) {
      throw new AppError(
        StatusCodes.CONFLICT,
        'An attorney with this email already exists'
      );
    }
  }

  const attorney = await Attorney.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true }
  ).lean<IAttorney>({ virtuals: true });

  if (!attorney) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Attorney not found');
  }

  return attorney;
};

const deleteAttorneyFromDB = async (id: string): Promise<void> => {
  const attorney = await Attorney.findByIdAndDelete(id);

  if (!attorney) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Attorney not found');
  }
};

export const AttorneyService = {
  createAttorneyIntoDB,
  getAllAttorneysFromDB,
  getAttorneyByIdFromDB,
  updateAttorneyIntoDB,
  deleteAttorneyFromDB,
};

