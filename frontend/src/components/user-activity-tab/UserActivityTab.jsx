import React from 'react';
import '@stackoverflow/stacks-icons';
import '@stackoverflow/stacks/dist/css/stacks.css';

import UserActivityTabTags from '../user-activity-tab-tags/UserActivityTabTags';
import './UserActivityTab.css';

export default function UserActivityTab() {
	const renderTagsSection = () => {
		return <UserActivityTabTags />;
	};

	return (
		<div className="d-flex mb48">
			<nav className="flex--item fl-shrink0 mr32 wmn1 md:d-none js-settings-nav">
				<ul
					role="tablist"
					className="s-navigation s-navigation__vertical s-navigation__muted ps-sticky t64"
				>
					<li>
						<button
							type="button"
							className="s-navigation--item pr48 ps-relative"
							role="tab"
							aria-selected="false"
						>
							Answers
						</button>
					</li>

					<li>
						<button
							type="button"
							className="s-navigation--item pr48 ps-relative"
							role="tab"
							aria-selected="false"
						>
							Questions
						</button>
					</li>
					<li>
						<button
							type="button"
							className="s-navigation--item pr48 ps-relative is-selected"
							role="tab"
							aria-selected="true"
						>
							Tags
						</button>
					</li>
					<li>
						<button
							type="button"
							className="s-navigation--item pr48 ps-relative"
							role="tab"
							aria-selected="true"
						>
							Badges
						</button>
					</li>
					<li>
						<button
							type="button"
							className="s-navigation--item pr48 ps-relative"
							role="tab"
							aria-selected="true"
						>
							Bookmarks
						</button>
					</li>
					<li>
						<button
							type="button"
							className="s-navigation--item pr48 ps-relative"
							role="tab"
							aria-selected="true"
						>
							Reputation
						</button>
					</li>
				</ul>
			</nav>
			{renderTagsSection()}
		</div>
	);
}
