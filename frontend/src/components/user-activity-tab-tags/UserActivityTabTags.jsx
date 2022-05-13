import React from 'react';
import { connect } from 'react-redux';
import './UserActivityTabTags.css';

const UserActivityTabTags = ({ user }) => {
	const renderTags = (tagsInformation) => {
		const content = [];
		tagsInformation.forEach((tag) => {
			content.push(
				<div className="d-flex ai-center jc-space-between gs16 fw-wrap">
					<div className="flex--item ws-nowrap">
						<a
							href="/search?q=user:8380272+[r]"
							className="post-tag js-gps-track"
							rel="tag"
						>
							{Object.keys(tag)[0]}
						</a>
					</div>
					<div className="flex--item">
						<div className="d-flex gsx gs16">
							<div className="flex--item d-flex ai-center">
								<div className="fs-body3 mr4">{tag.score}</div>
								<div className="fc-light tt-lowercase">
									Score
								</div>
							</div>
							<div className="flex--item d-flex ai-center">
								<div className="fs-body3 mr4">{tag.posts}</div>
								<div className="fc-light">posts</div>
							</div>
						</div>
					</div>
				</div>,
			);
		});
	};
	return (
		<div className="user-activity-tab-tags">
			<div id="user-tab-tags" className="js-user-tab">
				<div className="d-flex ai-end jc-space-between mb8 fw-wrap">
					<div className="flex--item fl-grow1">
						<div className="d-flex fd-column">
							<h2 className="flex--item fs-title mb0">
								{Object.keys(user.tagsInformation).length +
									' Tags'}
							</h2>
						</div>
					</div>
				</div>

				<div className="ba bc-black-100 bar-md">
					<div className="p12 bb bc-black-075">
						{renderTags(user.tagsInformation)}
						<div className="d-flex ai-center jc-space-between gs16 fw-wrap">
							<div className="flex--item ws-nowrap">
								<a
									href="/search?q=user:8380272+[r]"
									className="post-tag js-gps-track"
									title="show questions tagged 'r'"
									rel="tag"
								>
									r
								</a>
							</div>
							<div className="flex--item">
								<div className="d-flex gsx gs16">
									<div className="flex--item d-flex ai-center">
										<div className="fs-body3 mr4">
											2,848
										</div>
										<div className="fc-light tt-lowercase">
											Score
										</div>
									</div>
									<div className="flex--item d-flex ai-center">
										<div className="fs-body3 mr4">
											2,012
										</div>
										<div className="fc-light">posts</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.user.user,
});

export default connect(mapStateToProps)(UserActivityTabTags);
