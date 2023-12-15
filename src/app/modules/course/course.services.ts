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

  const result = await courseModel.findById(heighest[0]._id);

  if (result) {
    myNewObj = { ...result.toObject() };
    myNewObj.averageRating = heighest[0]?.averageScore;
    myNewObj.reviewCount = heighest[0]?.reviewCount;
  } else {
    throw new Error('something went wrong');
  }

  return myNewObj;
};

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

export const courseServices = {
  createCourse,
  paginatedAndFilteredCourse,
  getBestCourse,
};
