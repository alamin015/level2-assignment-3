import { TCourse } from './course.interface';
import { courseModel } from './course.model';
import { reviewModel } from '../review/review.model';

const createCourse = async (payload: TCourse) => {
  const result = await courseModel.create(payload);
  return result;
};
// best course /

const getBestCourse = async () => {
  let myNewObj: Record<string, unknown> = {};
  const heighest = await reviewModel.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageScore: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $sort: { averageScore: -1 },
    },
    {
      $limit: 1,
    },
  ]);
  let result;
  if (heighest.length) {
    result = await courseModel.findById(heighest[0]._id);
  } else {
    throw new Error('There is no Course!! please insert some course');
  }

  if (result) {
    myNewObj = { ...result.toObject() };
    myNewObj.averageRating = heighest[0]?.averageScore;
    myNewObj.reviewCount = heighest[0]?.reviewCount;
  } else {
    throw new Error('something went wrong');
  }

  return myNewObj;
};

export const courseServices = {
  createCourse,
  getBestCourse,
};
