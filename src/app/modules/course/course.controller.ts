import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { courseServices } from './course.services';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const courseData = req.body;
  const result = await courseServices.createCourse(courseData);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Course created successfully',
    data: result,
  });
});
// best course

const getBestCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getBestCourse();
  res.status(200).json({
    success: true,
    message: 'Best Course Retrived successfully',
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getBestCourse,
};
