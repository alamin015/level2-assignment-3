import { TReview } from './review.interface';
import { reviewModel } from './review.model';

const createReview = async (payload: TReview) => {
  const result = reviewModel.create(payload);
  return result;
};

export const reviewServices = {
  createReview,
};
