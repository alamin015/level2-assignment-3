import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { reviewServices } from './review.services';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const reviewData = req.body;
  const result = await reviewServices.createReview(reviewData);
  res.status(200).json({
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

export const reviewController = {
  createReview,
};
