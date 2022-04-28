import React from 'react';
import '@stackoverflow/stacks-icons';
import '@stackoverflow/stacks/dist/css/stacks.css';

import './UserProfile.css';

export default function UserProfile() {
	return (
		<div className="user-profile-container">
			<div className="ps-relative mb16">
				<div className="d-flex ai-center fw-wrap gs16">
					<a href="…" className="flex--item s-avatar s-avatar__128">
						<img
							className="s-avatar--image"
							src="https://picsum.photos/256"
						/>
					</a>
					<div className="flex--item">
						<div className="d-flex ai-center fw-wrap gs8 wmx4">
							<div className="flex--item mb12 fs-headline2 lh-xs">
								Tuba Ahmed
							</div>
						</div>
						<ul className="list-reset s-anchors s-anchors__inherit d-flex fc-light gs8 mln4 fw-wrap">
							<li className="flex--item">
								<div className="d-flex gs4 gsx ai-center">
									<div className="flex--item fc-black-350">
										<svg
											aria-hidden="true"
											className="svg-icon iconCake"
											width="18"
											height="18"
											viewBox="0 0 18 18"
										>
											<path d="M9 4.5a1.5 1.5 0 0 0 1.28-2.27L9 0 7.72 2.23c-.14.22-.22.48-.22.77 0 .83.68 1.5 1.5 1.5Zm3.45 7.5-.8-.81-.81.8c-.98.98-2.69.98-3.67 0l-.8-.8-.82.8c-.49.49-1.14.76-1.83.76-.55 0-1.3-.17-1.72-.46V15c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2v-2.7c-.42.28-1.17.45-1.72.45-.69 0-1.34-.27-1.83-.76Zm1.3-5H10V5H8v2H4.25C3 7 2 8 2 9.25v.9c0 .81.91 1.47 1.72 1.47.39 0 .77-.14 1.03-.42l1.61-1.6 1.6 1.6a1.5 1.5 0 0 0 2.08 0l1.6-1.6 1.6 1.6c.28.28.64.43 1.03.43.81 0 1.73-.67 1.73-1.48v-.9C16 8.01 15 7 13.75 7Z"></path>
										</svg>
									</div>
									<div className="flex--item">
										Member for{' '}
										<span title="2022-03-19 03:28:28Z">
											40 days
										</span>
									</div>
								</div>
							</li>

							<li className="flex--item">
								<div className="d-flex gs4 gsx ai-center">
									<div className="flex--item fc-black-350">
										<svg
											aria-hidden="true"
											className="svg-icon iconClock"
											width="18"
											height="18"
											viewBox="0 0 18 18"
										>
											<path d="M9 17c-4.36 0-8-3.64-8-8 0-4.36 3.64-8 8-8 4.36 0 8 3.64 8 8 0 4.36-3.64 8-8 8Zm0-2c3.27 0 6-2.73 6-6s-2.73-6-6-6-6 2.73-6 6 2.73 6 6 6ZM8 5h1.01L9 9.36l3.22 2.1-.6.93L8 10V5Z"></path>
										</svg>
									</div>
									<div className="flex--item">
										Last seen this week{' '}
									</div>
								</div>
							</li>

							<li
								id="js-daily-access-calendar-container"
								className="flex--item"
							>
								<div className="d-flex gs4 gsx ai-center">
									<div className="flex--item fc-black-350">
										<svg
											aria-hidden="true"
											className="svg-icon iconCalendar"
											width="18"
											height="18"
											viewBox="0 0 18 18"
										>
											<path d="M14 2h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h1V0h2v2h6V0h2v2ZM3 6v9h12V6H3Zm2 2h2v2H5V8Zm0 3h2v2H5v-2Zm3 0h2v2H8v-2Zm3 0h2v2h-2v-2Zm0-3h2v2h-2V8ZM8 8h2v2H8V8Z"></path>
										</svg>
									</div>
									<div className="flex--item">
										Visited 9 days, 2 consecutive
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<nav className="user-profile-nav">
					<ul role="tablist" className="s-navigation">
						<li>
							<button
								type="button"
								className="s-navigation--item is-selected"
								role="tab"
								aria-selected="true"
							>
								Profile
							</button>
						</li>
						<li>
							<button
								type="button"
								className="s-navigation--item"
								role="tab"
								aria-selected="false"
							>
								Activity
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
