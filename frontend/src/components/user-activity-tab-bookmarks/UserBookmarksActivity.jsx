import React from 'react';
import './UserBookmarksActivity.css';

export default function UserBookmarksActivity({ user }) {
	const renderBookmarks = () => {
		const content = [];
		user.bookmarks.forEach((bookmark) => {
			const tagsContent = [];
			bookmark.tags.forEach((tag) => {
				tagsContent.push(<a className="post-tag">{tag.name}</a>);
			});
			content.push(
				<div className="s-post-summary p12 s-post-summary__minimal">
					<div className="s-post-summary--stats">
						<div className="s-post-summary--stats-item has-answers">
							{/* <svg
								aria-hidden="true"
								className="va-text-bottom svg-icon iconCheckmarkSm"
								width="14"
								height="14"
								viewBox="0 0 14 14"
							>
								<path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path>
							</svg>{' '} */}
							{bookmark.answers.length} answers
						</div>
						<div className="s-post-summary--stats-item">
							{bookmark.votes} votes
						</div>
						<div className="s-post-summary--stats-item hot">
							{bookmark.views} views
						</div>
					</div>
					<div className="s-post-summary--content">
						<span>
							<a
								href={'/questions/'+bookmark._id}
								className="s-post-summary--content-title s-link"
							>
								{bookmark.title}
							</a>
						</span>
						{/* <div className="s-post-summary--meta">
							<div className="s-post-summary--meta-tags">
								{tagsContent}
							</div>
						</div> */}
					</div>
				</div>,
			);
		});
		return content;
	};
	return (
		<div className="user-activity-bookmarks-container">
			<div id="user-tab-bookmarks" className="js-user-tab">
				<div className="d-flex ai-end jc-space-between mb8 fw-wrap">
					<div className="flex--item fl-grow1">
						<div className="d-flex fd-column">
							<h2 className="flex--item fs-title mb0">
								{user.bookmarks.length} Bookmarks
							</h2>
						</div>
					</div>
				</div>

				<div className="ba bc-black-100 bar-md">
					<div id="js-post-summaries">{renderBookmarks()}</div>
				</div>
			</div>
		</div>
	);
}
