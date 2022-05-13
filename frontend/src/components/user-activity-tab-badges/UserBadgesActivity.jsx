import React from 'react';
import './UserBadgesActivity.css';

export default function UserBadgesActivity({ user }) {
	const getBadgeClass = (level) => {
		if (level === 'Gold') return 1;
		if (level === 'Silver') return 2;
		if (level === 'Bronze') return 3;
	};
	const renderBadges = () => {
		let content = [];
		console.log(user);
		Object.keys(user.badges).forEach((badgeName) => {
			const badge = user.badges[badgeName];
			content.push(
				<div className="grid--item">
					<div className="d-flex ai-center jc-start">
						<div className="flex--item mbn4">
							<a
								href="/help/badges/19/enlightened?userid=2901002"
								title="silver badge: First to answer and accepted with score of 10 or more"
								className={
									badge.type === 'tag'
										? 'badge-tag '
										: 'badge '
								}
							>
								<span
									className={
										'badge' + getBadgeClass(badge.level)
									}
								></span>
								&nbsp;{badgeName}
							</a>
						</div>
					</div>
				</div>,
			);
		});
		return content;
	};
	return (
		<div className="user-activity-badges-container">
			<div>
				<div className="d-flex ai-end jc-space-between mb8 fw-wrap">
					<div className="flex--item fl-grow1">
						<div className="d-flex fd-column">
							<h2 className="flex--item fs-title mb0">
								{user && Object.keys(user.badges).length} Badges
							</h2>
						</div>
					</div>
				</div>
				<div className="d-grid g16 grid__4 lg:grid__3 md:grid__2 sm:grid__1 py8">
					{renderBadges()}
				</div>
			</div>
		</div>
	);
}
