import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { reviewValidation } from './review.validation';
import { reviewController } from './review.controller';

const router = Router();

router.post(
  '/',
  validateRequest(reviewValidation.createReview),
  reviewController.createReview,
);

export const reviewRoute = router;
