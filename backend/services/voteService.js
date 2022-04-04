const Vote = require('../models/Vote');
const uuid = require('uuidv4');


const getVotesForQuestionId = async (body) => {
  console.log('Entering voteService.getVotesByResourceId');
  try {
    const votesResponse = await Vote.find({ resourceId: body.resourceId }).exec();
    console.log(`get vote respoinse :${voteResponse}`);
    return { data: votesResponse };
  } catch (e) {
    console.error('Exception occurred while getting votes', e);
    return { error: { message: e.message } };
  }
};

const addVote = async (body) => {
  console.log(`Entering voteService.addVote,payload is ${body}`);
  try {
    const newVoteId = `c-${uuid()}`
    const vote = {_id: newVoteId, ...body }
    const voteResponse = await Vote.create(vote);
    console.log(`add vote respoinse :${voteResponse}`);
    if (voteResponse) {
      return { data: { message: `Vote ${newVoteId} created Successfully` } };
    }
    return { error: { message: 'Some error occured while creating vote' } };
  } catch (e) {
    console.error('Exception occurred while creating vote', e);
    return { error: { message: e.message } };
  }
};

module.exports = {
    getVotesByResourceId, addVote
};
