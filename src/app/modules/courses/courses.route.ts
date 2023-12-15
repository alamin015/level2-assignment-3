import { Router } from 'express';
import { coursesControllers } from './courses.controller';
import { courseValidation } from '../course/course.validation';
import validateRequest from '../../middleware/validateRequest';

const router = Router();

router.get('/:id/reviews', coursesControllers.getSingleCourse);
router.get('/', coursesControllers.paginatedAndFilteredCourse);
router.put(
  '/:courseId',
  validateRequest(courseValidation.updateCourseValidation),
  coursesControllers.updateCourse,
);
export const coursesRouter = router;
