import React from 'react';
import '@stackoverflow/stacks-icons';
import '@stackoverflow/stacks/dist/css/stacks.css';

import './UserActivityTabTags.css';

export default function UserActivityTabTags() {
	return (
		<section className="flex--item fl-grow1 wmx100">
			<div id="user-tab-tags" className="js-user-tab">
				<div className="d-flex ai-end jc-space-between mb8 fw-wrap">
					<div className="flex--item fl-grow1">
						<div className="d-flex fd-column">
							<h2 className="flex--item fs-title mb0">
								663 Tags
							</h2>
						</div>
					</div>
					<div className="flex--item">
						<div className="d-flex ai-end">
							<div className="flex--item s-btn-group js-user-tab-sorts fl-shrink0 md:fl-shrink1">
								<a
									href="/users/8380272/onyambu?tab=tags&amp;sort=votes"
									className="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort is-selected js-selected"
									data-sort="votes"
								>
									Score
								</a>
								<a
									href="/users/8380272/onyambu?tab=tags&amp;sort=name"
									className="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort"
									data-sort="name"
								>
									Name
								</a>
							</div>
						</div>
					</div>
				</div>

				<div className="ba bc-black-100 bar-md">
					<div
						className="p12 bb bc-black-075"
						title="7 non-wiki questions (7 score). 2005 non-wiki answers (2848 score)."
					>
						<div className="d-flex ai-center jc-space-between gs16 fw-wrap">
							<div className="flex--item ws-nowrap">
								<a
									href="/search?q=user:8380272+[r]"
									className="post-tag js-gps-track"
									title="show questions tagged 'r'"
									rel="tag"
									data-gps-track="profile_link.click({target:2, type:2 })"
								>
									r
								</a>
								<a
									href="/help/badges/208/r"
									className="badge-tag bg-transparent bc-transparent m0"
									title="Gold badge"
								>
									<span className="badge1"></span>
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
		</section>
	);
}
