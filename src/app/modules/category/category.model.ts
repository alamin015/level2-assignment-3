import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
    required: [true, 'Name must be required'],
    unique: true,
  },
});

export const categoryModel = model<TCategory>('category', categorySchema);
