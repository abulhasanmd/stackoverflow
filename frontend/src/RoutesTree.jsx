/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import withPageTitle from './components/withPageTitle/withPageTitle';
import LayoutWrapper from './components/LayoutWrapper/LayoutWrapper.component';
import RegisterPage from './pages/Register/RegisterPage';
import AllTagsPage from './pages/AllTagsPage/AllTagsPage';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage';
import QuestionActivity from './pages/QuestionActivity/QuestionActivity';
import AskQuestionPage from './pages/AskQuestionPage/AskQuestionPage';
import AdminAnalytics from './components/admin-analytics/AdminAnalytics';
import Post from './pages/Post/Post';
import Home from './pages/Home/Home';
import ChatBody from './components/chatBody/ChatBody';
import AllUsersPage from './pages/AllUsersPage/AllUsersPage.component';
import ProfilePage from './pages/ProfilePage/ProfilePage.component';
import AllPendingQuestions from './pages/AllPendingQuestionsPage/AllPendingQuestions';

//import AskQuestionPage from './pages/AskQuestionPage/AskQuestionPage';

// const Register = withPageTitle({
//   component: RegisterPage,
//   title: "Sign Up - Stack Overflow",
// })

//import TagPage from './pages/TagPage/TagPage';

const AllTagsPageComponent = withPageTitle({
	component: LayoutWrapper({ component: AllTagsPage }),
	title: 'Tags - CLONE Stack Overflow',
});

const QuestionsPageComponent = withPageTitle({
	component: LayoutWrapper({ component: QuestionsPage }),
	title: 'All Questions - Stack Overflow',
});

const ProfilePageComponent = LayoutWrapper({component: ProfilePage});

const QuestionActivityComponent = withPageTitle({
	component: LayoutWrapper({ component: QuestionActivity }),
	title: 'Question Activity - Stack Overflow',
});

const IndividualPost = withPageTitle({
	component: LayoutWrapper({ component: Post }),
	title: 'Post - Stack Overflow',
});

const AllUsersPageComponent = withPageTitle({
	component: LayoutWrapper({component: AllUsersPage}),
	title: 'Users - CLONE Stack Overflow',
  });


const AdminAnalyticsComponent = withPageTitle({
	component: LayoutWrapper({ component: AdminAnalytics }),
	title: 'Admin Analytics',
});

const AllPendingQuestionsComponent = withPageTitle({
	component: LayoutWrapper({ component: AllPendingQuestions }),
	title: 'Admin Analytics',
});

const RoutesTree = () => {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route
				exact
				path="/questions"
				element={<QuestionsPageComponent />}
			/>
			<Route exact path="/add/question" element={<AskQuestionPage />} />
			<Route
				exact
				path="/questions"
				element={<QuestionsPageComponent />}
			/>
			{/* <Route exact path='/tags/:tagname' component={TagPageComponent} /> */}
			<Route exact path="/questions/:id" element={<IndividualPost />} />
			<Route exact path="/questions/timeline/:id" element={<QuestionActivityComponent />} />
			<Route exact path='/users/:id' element={<ProfilePageComponent />} />
			<Route exact path='/allusers' element={<AllUsersPageComponent />} />
			<Route exact path="/tags" element={<AllTagsPageComponent />} />
			<Route exact path="/register" element={<RegisterPage />} />
			<Route exact path="/login" element={<LoginPage />} />
			<Route
				exact
				path="/admin/analytics"
				element={<AdminAnalyticsComponent />}
			/>
			<Route exact path="/admin/pendingquestions" element ={<AllPendingQuestionsComponent/>}/>
			<Route path="*" element={<NotFoundPage />} />
			<Route path="/messages" element={<ChatBody/>} />
		</Routes>
	);
};

export default RoutesTree;
