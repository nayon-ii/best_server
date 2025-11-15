// src/features/insights/insight.model.ts
import { model, Schema } from 'mongoose';
import { IInsight, InsightModel } from './insight.interface';
import { STATUS } from '../../shared/enums/user';

const insightSchema = new Schema<IInsight, InsightModel>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
      index: true,
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [2, 'Description must be at least 2 characters'],
    },
    outcome: {
      type: String,
      required: [true, 'Outcome is required'],
      trim: true,
      minlength: [2, 'Outcome must be at least 2 characters'],
    },
    status: {
      type: String,
      enum: {
        values: [STATUS.ACTIVE, STATUS.INACTIVE],
        message: '{VALUE} is not a valid status',
      },
      default: STATUS.ACTIVE,
      index: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// Static method to check if insight exists by ID
insightSchema.statics.isExistInsightById = async function (
  id: string
): Promise<IInsight | null> {
  return await this.findById(id);
};

export const Insight = model<IInsight, InsightModel>(
  'Insight',
  insightSchema
);

