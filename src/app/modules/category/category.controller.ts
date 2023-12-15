import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { categoryServices } from './category.services';

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryData = req.body;
      const result = await categoryServices.createCategory(categoryData);
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Category created successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getAllCategory();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  getAllCategory,
};
