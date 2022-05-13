/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import './UserActivityTabTags.css';

export default function UserActivityTabTags({ user }) {
	const renderTags = (tagsInformation) => {
		const content = [];
		if (tagsInformation) {
			Object.keys(tagsInformation).forEach((tag) => {
				content.push(
					<div className="p12 bb bc-black-075">
						<div className="d-flex ai-center jc-space-between gs16 fw-wrap">
							<div className="flex--item ws-nowrap">
								<a
									href="/"
									className="post-tag js-gps-track"
									rel="tag"
								>
									{tag}
								</a>
							</div>
							<div className="flex--item">
								<div className="d-flex gsx gs16">
									<div className="flex--item d-flex ai-center">
										<div className="fs-body3 mr4">
											{tagsInformation[tag].score}
										</div>
										<div className="fc-light tt-lowercase">
											Score
										</div>
									</div>
									<div className="flex--item d-flex ai-center">
										<div className="fs-body3 mr4">
											{tagsInformation[tag].posts}
										</div>
										<div className="fc-light">posts</div>
									</div>
								</div>
							</div>
						</div>
					</div>,
				);
			});
		}
		return content;
	};
	return (
		<div className="user-activity-tab-tags">
			<div id="user-tab-tags" className="js-user-tab">
				<div className="d-flex ai-end jc-space-between mb8 fw-wrap">
					<div className="flex--item fl-grow1">
						<div className="d-flex fd-column">
							<h2 className="flex--item fs-title mb0">
								{user.tagsInformation
									? `${
											Object.keys(user.tagsInformation)
												.length
									  } Tags`
									: '0 Tags'}
							</h2>
						</div>
					</div>
				</div>

				<div className="ba bc-black-100 bar-md">
					{renderTags(user.tagsInformation)}
				</div>
			</div>
		</div>
	);
}
