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

// pagination
const paginatedAndFilteredCourse = async (payload: Record<string, unknown>) => {
  const demoQuery = { ...payload };

  // const skip =

  const excludeFeileds = [
    'limit',
    'page',
    'sortBy',
    'minPrice',
    'maxPrice',
    'tags',
  ];
  excludeFeileds.forEach((el) => delete demoQuery[el]);

  /*****************
  for tags
  **********************/
  let tagName = '';
  if (payload?.tags) {
    tagName = payload?.tags as string;
  }
  const tagQuery = courseModel.find({ 'tags.name': tagName });

  /*****************
  filter
  **********************/
  // let myQuery: Record<string, unknown> = {};
  // if (payload.level) {
  //   myQuery = {};
  // }
  const filterQuery = tagQuery.find(demoQuery);

  /*****************
  min price and max price filtering
  **********************/
  let mnPrice = 1;
  let mxPrice = 999999999999;
  if (payload?.minPrice) {
    mnPrice = Number(payload.minPrice);
  }
  if (payload?.maxPrice) {
    mxPrice = Number(payload.maxPrice);
  }
  const minMaxQuery = filterQuery
    .find({
      $and: [{ price: { $gte: mnPrice } }, { price: { $lte: mxPrice } }],
    })
    .populate('categoryId');

  /*****************
  filter
  **********************/

  /*****************
  limit
  **********************/

  let page = 1;
  let limit = 10;
  if (payload?.page) {
    page = Number(payload?.page);
  }

  if (payload?.limit) {
    limit = Number(payload?.limit);
  }

  const limitQuery = minMaxQuery.limit(limit);
  /*****************
  pagination
  **********************/
  const skip = (page - 1) * limit;
  const pagination = limitQuery.skip(skip);

  /*****************
 sortBy
  **********************/
  let sortBy = 'price';

  if (payload?.sortBy === 'startDate' || payload?.sortBy === '-startDate') {
    sortBy = payload.sortBy as string;
  }
  if (payload?.sortBy === 'title' || payload?.sortBy === '-title') {
    sortBy = payload.sortBy as string;
  }
  if (payload?.sortBy === 'price' || payload?.sortBy === '-price') {
    sortBy = payload.sortBy as string;
  }
  if (payload?.sortBy === 'endDate' || payload?.sortBy === '-endDate') {
    sortBy = payload.sortBy as string;
  }
  if (payload?.sortBy === 'language' || payload?.sortBy === '-language') {
    sortBy = payload.sortBy as string;
  }

  const result = await pagination.sort(sortBy);

  const meta: Record<string, unknown> = { page, limit, total: result.length };

  return { result, meta };
};

export const coursesServices = {
  updateCourse,
  getSingleCourse,
  paginatedAndFilteredCourse,
};
