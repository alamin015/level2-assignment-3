import catchAsync from '../../utils/catchAsync';
import { coursesServices } from './courses.service';

// updated courses
const updateCourse = catchAsync(async (req, res) => {
  const courseData = req.body;
  const courseId = req.params.courseId;
  const result = await coursesServices.updateCourse(courseId, courseData);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Course updated successfully',
    data: result,
  });
});

// single courses
const getSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await coursesServices.getSingleCourse(id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});

export const coursesControllers = {
  updateCourse,
  getSingleCourse,
};
