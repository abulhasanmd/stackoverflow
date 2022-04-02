const Tag = require('../models/Tag');


const getTags = async (msg) => {
	try 
    {
		const tags = await Tag.find({ }).lean();
        tags.sort((a, b) => (a.questionsCount > b.questionsCount) ? -1 : 1);
        return {
			data: tags,
		};
	} 
    catch (e) 
    {
		console.error('Exception occurred while creating question', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

module.exports = {
	getTags
};