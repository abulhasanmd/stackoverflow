import React, { useState } from 'react';
import UserBadgesActivity from '../user-activity-tab-badges/UserBadgesActivity';
import UserReputationActivity from '../user-activity-tab-reputation/UserReputationActivity';
import UserActivityTabTags from '../user-activity-tab-tags/UserActivityTabTags';
import UserBookmarksActivity from '../user-activity-tab-bookmarks/UserBookmarksActivity';
import './UserActivityTab.css';

export default function UserActivityTab({ user }) {
	const renderSection = () => {
		if (section === 'tags') return <UserActivityTabTags user={user} />;
		if (section === 'badges') return <UserBadgesActivity user={user} />;
		if (section === 'reputation')
			return <UserReputationActivity user={user} />;
		if (section === 'bookmarks')
			return <UserBookmarksActivity user={user} />;
	};

	const [section, setSection] = useState('tags');

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
							className={
								's-navigation--item pr48 ps-relative ' +
								(section === 'answers' ? 'is-selected' : '')
							}
							role="tab"
							onClick={() => {
								setSection('answers');
							}}
						>
							Answers
						</button>
					</li>

					<li>
						<button
							type="button"
							className={
								's-navigation--item pr48 ps-relative ' +
								(section === 'questions' ? 'is-selected' : '')
							}
							role="tab"
							onClick={() => {
								setSection('questions');
							}}
						>
							Questions
						</button>
					</li>
					<li>
						<button
							type="button"
							className={
								's-navigation--item pr48 ps-relative ' +
								(section === 'tags' ? 'is-selected' : '')
							}
							role="tab"
							onClick={() => {
								setSection('tags');
							}}
						>
							Tags
						</button>
					</li>
					<li>
						<button
							type="button"
							className={
								's-navigation--item pr48 ps-relative ' +
								(section === 'badges' ? 'is-selected' : '')
							}
							role="tab"
							onClick={() => {
								setSection('badges');
							}}
						>
							Badges
						</button>
					</li>
					<li>
						<button
							type="button"
							className={
								's-navigation--item pr48 ps-relative ' +
								(section === 'bookmarks' ? 'is-selected' : '')
							}
							role="tab"
							onClick={() => {
								setSection('bookmarks');
							}}
						>
							Bookmarks
						</button>
					</li>
					<li>
						<button
							type="button"
							className={
								's-navigation--item pr48 ps-relative ' +
								(section === 'reputation' ? 'is-selected' : '')
							}
							role="tab"
							onClick={() => {
								setSection('reputation');
							}}
						>
							Reputation
						</button>
					</li>
				</ul>
			</nav>
			{renderSection()}
		</div>
	);
}
