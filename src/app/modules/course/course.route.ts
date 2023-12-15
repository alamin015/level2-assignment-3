import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { courseValidation } from './course.validation';
import { courseControllers } from './course.controller';

const router = Router();
router.get('/best', courseControllers.getBestCourse);

router.post(
  '/',
  validateRequest(courseValidation.createCourseValidation),
  courseControllers.createCourse,
);

export const courseRoute = router;
