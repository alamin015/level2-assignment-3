import { Router } from 'express';
import { categoryRoutes } from '../modules/category/category.route';
import { courseRoute } from '../modules/course/course.route';
import { reviewRoute } from '../modules/review/review.route';
import { coursesRouter } from '../modules/courses/courses.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/course',
    route: courseRoute,
  },
  {
    path: '/courses',
    route: coursesRouter,
  },
  {
    path: '/reviews',
    route: reviewRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
