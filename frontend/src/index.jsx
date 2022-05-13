/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@stackoverflow/stacks-icons';
import '@stackoverflow/stacks/dist/css/stacks.css';
import '@stackoverflow/stacks/dist/js/stacks';
// import './index.css';
import App from './App';
// import PostQuestion from './components/post-question/PostQuestion';
// import UserProfile from './components/user-profile/UserProfile';
// import UserActivityTab from './components/user-activity-tab/UserActivityTab';
// import UserReputationActivity from './components/user-activity-tab-reputation/UserReputationActivity';
// import UserBadgesActivity from './components/user-activity-tab-badges/UserBadgesActivity';
// import UserBookmarksActivity from './components/user-activity-tab-bookmarks/UserBookmarksActivity';
import UserActivityTabTags from './components/user-activity-tab-tags/UserActivityTabTags';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<UserActivityTabTags />
	</BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
