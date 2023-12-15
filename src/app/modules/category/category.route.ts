import express from 'express';
import { categoryControllers } from './category.controller';
import validateRequest from '../../middleware/validateRequest';
import { categoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(categoryValidation.createCategoryValidation),
  categoryControllers.createCategory,
);
router.get('/', categoryControllers.getAllCategory);

export const categoryRoutes = router;
