// src/features/insights/insight.interface.ts
import { Document, Model, Types } from 'mongoose';
import { STATUS } from '../../shared/enums/user';

export interface IInsight extends Document {
  _id: Types.ObjectId;
  title: string;
  type: string;
  description: string;
  outcome: string;
  status: STATUS;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsightModel extends Model<IInsight> {
  isExistInsightById(id: string): Promise<IInsight | null>;
}

export interface IInsightFilters {
  searchTerm?: string;
  type?: string;
  status?: STATUS;
  startDate?: string;
  endDate?: string;
}

