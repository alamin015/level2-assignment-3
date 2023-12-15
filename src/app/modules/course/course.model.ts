import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTags } from './course.interface';

const tagsSchema = new Schema<TTags>({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
});

const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  description: { type: String, required: true },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'category',
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: [tagsSchema],
      required: true,
      _id: false,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    details: {
      type: detailsSchema,
      required: true,
      _id: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

courseSchema.virtual('durationInWeeks').get(function () {
  const startDate: number = new Date(this.startDate).getTime();
  const endDate: number = new Date(this.endDate).getTime();
  const differenceInWeeks = (endDate - startDate) / (1000 * 60 * 60 * 24 * 7);

  return Math.ceil(differenceInWeeks);
});
export const courseModel = model<TCourse>('course', courseSchema);
