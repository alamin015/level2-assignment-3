import { TCategory } from './category.interface';
import { categoryModel } from './category.model';

const createCategory = async (payload: TCategory) => {
  const result = await categoryModel.create(payload);
  return result;
};
const getAllCategory = async () => {
  const result = await categoryModel.find();
  return result;
};

export const categoryServices = {
  createCategory,
  getAllCategory,
};
