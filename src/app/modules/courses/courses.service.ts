import { Types } from 'mongoose';
import { TCourse } from '../course/course.interface';
import { courseModel } from '../course/course.model';

// updated courses
const updateCourse = async (courseId: string, payload: Partial<TCourse>) => {
  const { tags, details, ...remaining } = payload;
  const modifiedObj: Record<string, unknown> = { ...remaining };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedObj[`details.${key}`] = value;
    }
  }
  let result;
  result = await courseModel.findOneAndUpdate({ _id: courseId }, modifiedObj, {
    new: true,
    runValidators: true,
  });

  // if there is any tags
  if (tags && tags.length > 0) {
    const deletedTags = tags
      .filter((el) => el.name && el.isDeleted)
      .map((el) => el.name);

    await courseModel.findByIdAndUpdate(courseId, {
      $pull: { tags: { name: { $in: deletedTags } } },
    });
  }

  if (tags && tags.length > 0) {
    const updatedTags = tags.filter((el) => el.name && !el.isDeleted);

    result = await courseModel.findByIdAndUpdate(
      courseId,
      {
        $addToSet: { tags: { $each: updatedTags } },
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  return result;
};

// get Single course
const getSingleCourse = async (id: string) => {
  const result = courseModel.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
  ]);
  return result;
};

export const coursesServices = { updateCourse, getSingleCourse };
