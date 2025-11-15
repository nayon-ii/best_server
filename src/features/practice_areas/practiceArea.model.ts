// src/features/practice_areas/practiceArea.model.ts
import { model, Schema } from 'mongoose';
import { IPracticeArea, PracticeAreaModel } from './practiceArea.interface';
import { STATUS } from '../../shared/enums/user';

const practiceAreaSchema = new Schema<IPracticeArea, PracticeAreaModel>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [2, 'Description must be at least 2 characters'],
    },
    image: {
      type: String,
      trim: true,
      default: null,
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

// Static method to check if practice area exists by ID
practiceAreaSchema.statics.isExistPracticeAreaById = async function (
  id: string
): Promise<IPracticeArea | null> {
  return await this.findById(id);
};

export const PracticeArea = model<IPracticeArea, PracticeAreaModel>(
  'PracticeArea',
  practiceAreaSchema
);

