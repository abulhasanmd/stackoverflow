const Tag = require('../models/Tag');

const getTags = async () => {
  console.log('Entering adminService.getTags');
  try {
    const tags = await Tag.find().exec();
    if (tags.length < 1) {
      return { error: { message: 'No Tags found' } };
    }
    return { data: tags };
  } catch (e) {
    console.error('Exception occurred while getting tags', e);
    return { error: { message: e.message } };
  }
};

const addTag = async (tagRequest) => {
  console.log(`Entering adminService.addTag,params are ${tagRequest}`);
  try {
    const tag = new Tag({
      name: tagRequest.name,
      descr: tagRequest.descr,
      createdBy: tagRequest.admin,
    });
    const tagResponse = await tag.save();
    console.log(`tagrespoinse :${tagResponse}`);
    if (tagResponse) {
      return { data: { message: `Tag ${tagRequest.name} created Successfully` } };
    }
    return { error: { message: 'Some error occured while creating Tag' } };
  } catch (e) {
    console.error('Exception occurred while getting tags', e);
    return { error: { message: e.message } };
  }
};
module.exports = { getTags, addTag };
