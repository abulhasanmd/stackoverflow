const Tag = require('../models/Tag');
const Question = require('../models/Question');
const User = require('../models/User');
const Event = require('../models/Event');

const questionConstants = require('../constants/questionConstants');

const getTagsUsedInQuestions = async (userId) => {
  try {
    const allTags = await Question.find({
      createdBy: userId,
    }).populate(tags).select({
      tags,
    });
    const mergedTags = {};
    allTags.forEach((tags) => {
      tags.forEach((tag) => {
        mergedTags[tag.name] = tag;
      });
    });
    return {
      data: Object.values(allTags),
    };
  } catch (e) {
    console.error('Exception occurred while getting tags', e);
    return {
      error: {
        message: e.message,
      },
    };
  }
};

const getBookmarks = async (userId) => {
  try {
    const bookmarks = await User.findById({
      userId,
    }).select({
      bookmarks,
    }).exec();
    return {
      data: bookmarks,
    };
  } catch (e) {
    console.error('Exception occured while fetching bookmarks', e);
    return {
      error: {
        message: e.message,
      },
    };
  }
};

const getReputationActivity = async (userId) => {
  try {
    const events = await Event.find({
      affectedUser: userId,
    }).exec();
    return {
      data: events,
    };
  } catch (e) {
    console.error('Error while fetching reputation activity', e);
    return {
      error: {
        message: e.message,
      },
    };
  }
};

module.exports = {
  getTagsUsedInQuestions,
  getBookmarks,
  getReputationActivity,
};
