// src/features/practice_areas/practiceArea.interface.ts
import { Document, Model, Types } from 'mongoose';
import { STATUS } from '../../shared/enums/user';

export interface IPracticeArea extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  image?: string;
  status: STATUS;
  createdAt: Date;
  updatedAt: Date;
}

export interface PracticeAreaModel extends Model<IPracticeArea> {
  isExistPracticeAreaById(id: string): Promise<IPracticeArea | null>;
}

export interface IPracticeAreaFilters {
  searchTerm?: string;
  status?: STATUS;
  startDate?: string;
  endDate?: string;
}

