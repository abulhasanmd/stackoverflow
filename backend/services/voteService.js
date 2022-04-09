const Vote = require('../models/Vote');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');

const addVote = async (body) => {
    console.log(`Entering voteService.addVote,payload is ${body}`);
    try {
        const vote = {
            ...body
        };
        const voteRecord = await Vote.find({
            $and: [{
                resourceId: body.resourceId
            }, {
                createdBy: body.createdBy
            }]
        });
        if (!voteRecord.length) {
            const voteResponse = await Vote.create(vote);
            console.log(`add vote response :${voteResponse}`);
            if (vote.resourceType === "ques") {
                const questionResponse = await Question.updateOne({
                    _id: body.resourceId
                }, {
                    $inc: {
                        score: vote.score,
                        votes: vote.votes
                    }
                });
                console.log(`update question response :${questionResponse}`);
            } else if (vote.resourceType === "ans") {
                const answerResponse = await Answer.updateOne({
                    _id: body.resourceId
                }, {
                    $inc: {
                        score: vote.score,
                        votes: vote.votes
                    }
                });
                console.log(`update answer response :${answerResponse}`);
            }
            const userResponse = await User.updateOne({
                _id: body.createdBy
            }, {
                $inc: {
                    reputation: vote.score
                }
            });
            if (voteResponse) {
                return {
                    data: {
                        message: `Vote created Successfully`
                    }
                };
            }
        } else {
            if ((voteRecord.score > 0 && vote.score < 0) || (voteRecord.score < 0 && vote.score > 0)) {
                const voteResponse = await Vote.updateOne({
                    _id: voteRecord[0]._id
                }, {
                    $set: {
                        score: vote.score,
                        votes: vote.votes
                    }
                });
                console.log(`update vote response :${voteResponse}`);
                if (vote.resourceType === "ques") {
                    const questionResponse = await Question.updateOne({
                        _id: body.resourceId
                    }, {
                        $inc: {
                            score: vote.score * 2,
                            votes: vote.votes * 2
                        }
                    });
                    console.log(`update question response :${questionResponse}`);
                } else if (vote.resourceType === "ans") {
                    const answerResponse = await Answer.updateOne({
                        _id: body.resourceId
                    }, {
                        $inc: {
                            score: vote.score * 2,
                            votes: vote.votes * 2
                        }
                    });
                    console.log(`update answer response :${answerResponse}`);
                }
                const userResponse = await User.updateOne({
                    _id: body.createdBy
                }, {
                    $inc: {
                        reputation: vote.score * 2
                    }
                });
                if (voteResponse) {
                    return {
                        data: {
                            message: `Vote ${voteRecord[0]._id} updated Successfully`
                        }
                    };
                }
            } else if ((voteRecord.score > 0 && vote.score > 0) || (voteRecord.score < 0 && vote.score < 0)) {
                return {
                    error: {
                        message: 'Vote already exists'
                    }
                };
            }
        }
        return {
            error: {
                message: 'Some error occured while creating vote'
            }
        };
    } catch (e) {
        console.error('Exception occurred while creating vote', e);
        return {
            error: {
                message: e.message
            }
        };
    }
};

module.exports = {
    addVote
};