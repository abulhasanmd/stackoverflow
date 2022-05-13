const User = require('../models/User');

const badgeRules = {
	numberOfQuestions: {
		Curious: {
			getLevel(numberOfQuestions) {
				if (numberOfQuestions < 2) {
					return 'Bronze';
				}
				if (numberOfQuestions >= 2 && numberOfQuestions < 5) {
					return 'Silver';
				}
				if (numberOfQuestions >= 5) {
					return 'Gold';
				}
				return '';
			},
		},
	},
	numberOfAnswers: {
		Helpfulness: {
			getLevel(numberOfAnswers) {
				if (numberOfAnswers < 2) {
					return 'Bronze';
				}
				if (numberOfAnswers >= 2 && numberOfAnswers < 5) {
					return 'Silver';
				}
				if (numberOfAnswers >= 5) {
					return 'Gold';
				}
				return '';
			},
		},
	},
	reputation: {
		Popular: {
			getLevel(reputation) {
				if (reputation <= 10) {
					return 'Bronze';
				}
				if (reputation > 10 && reputation < 15) {
					return 'Silver';
				}
				if (reputation >= 15) {
					return 'Gold';
				}
				return '';
			},
		},
	},
	numberOfUpvotes: {
		Sportsmanship: {
			getLevel(numberOfUpvotes) {
				if (numberOfUpvotes <= 2) {
					return 'Bronze';
				}
				if (numberOfUpvotes > 2 && numberOfUpvotes < 5) {
					return 'Silver';
				}
				if (numberOfUpvotes >= 5) {
					return 'Gold';
				}
				return '';
			},
		},
	},
	numberOfDownvotes: {
		Critic: {
			getLevel(numberOfDownvotes) {
				if (numberOfDownvotes <= 2) {
					return 'Bronze';
				}
				if (numberOfDownvotes > 2 && numberOfDownvotes < 5) {
					return 'Silver';
				}
				if (numberOfDownvotes >= 5) {
					return 'Gold';
				}
				return '';
			},
		},
	},
	numberOfQuestionViews: {
		'Notable Question': {
			getLevel(numberOfQuestionViews) {
				if (numberOfQuestionViews > 5) {
					return 'Gold';
				}
				return '';
			},
		},
		'Famous Question': {
			getLevel(numberOfQuestionViews) {
				if (numberOfQuestionViews > 15) {
					return 'Gold';
				}
				return '';
			},
		},
	},
	numberOfComments: {
		Pundit: {
			getLevel(numberOfComments) {
				if (numberOfComments > 3) {
					return 'Silver';
				}
				return '';
			},
		},
	},
	score: {
		getLevel(score) {
			if (score <= 10) {
				return 'Bronze';
			}
			if (score > 10 && score < 15) {
				return 'Silver';
			}
			if (score >= 15) {
				return 'Gold';
			}
			return '';
		},
	},
};

/**
 * @param {*} userId - User's ID
 * @param {*} metric - What metric is being used to calculate? e.g. numberOfUpvotes. Metric is 'score' for tag based badges.
 * @param {*} value - Value for the above metric
 * @param {*} tag - Name of the tag if the badge is tag based and not something like 'Curious'. Null otherwise.
 */
const updateBadges = async (userId, metric, value, tag) => {
	const user = await User.findById(userId);
	const badgesObj = user.badges || {};
	if (metric === 'score' && typeof tag === 'string') {
		if (!badgesObj[tag]) {
			badgesObj[tag] = {
				type: 'tag',
				name: tag,
			};
		}
		badgesObj[tag].level = badgeRules[metric].getLevel(value);
		await User.findByIdAndUpdate(userId, {
			badges: badgesObj,
		});
		return;
	}
	if (metric === 'score' && typeof tag !== 'string') {
		Object.keys(tag).forEach((tagName) => {
			if (!badgesObj[tagName]) {
				badgesObj[tagName] = {
					type: 'tag',
					name: tagName,
				};
			}
			badgesObj[tagName].level = badgeRules[metric].getLevel(tag[tagName].score);
		});
		await User.findByIdAndUpdate(userId, {
			badges: badgesObj,
		});
		return;
	}
	// if its not a tag
	const applicableBadgeRules = badgeRules[metric];
	if (applicableBadgeRules) {
		Object.keys(applicableBadgeRules).forEach((badge) => {
			if (!badgesObj[badge]) {
				badgesObj[badge] = {
					type: 'non-tag',
					name: badge,
				};
			}
			badgesObj[badge].level = applicableBadgeRules[badge].getLevel(value);
		});
		await User.findByIdAndUpdate(userId, {
			badges: badgesObj,
		});
	}
};

module.exports = {
	updateBadges,
};