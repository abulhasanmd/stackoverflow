import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfile } from '../../redux/users/users.actions';

import UserSection from './UserSection/UserSection.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Spinner from '../../components/Spinner/Spinner';
//import ExternalUserDetails from "./ExternalUserDetails/ExternalUserDetails.component";
import UserActivity from './UserActivity/UserActivity.component';

import './ProfilePage.styles.css';
import UserActivityTab from '../../components/user-activity-tab/UserActivityTab';

const ProfilePage = ({ getProfile, user: { user, loading } }) => {
	const { id } = useParams();
	useEffect(() => {
		getProfile(id);
		// eslint-disable-next-line
	}, [getProfile]);

	const [section, setSection] = useState('profile');

	return loading || user === null ? (
		<Spinner type="page" width="75px" height="200px" />
	) : (
		<Fragment>
			<PageTitle title={`User ${user.name} - Stack Overflow`} />
			<div id="mainbar" className="user-main-bar pl24 pt24">
				<div className="user-card">
					<div className="grid--cell s-navigation mb16">
						<button
							className={
								's-navigation--item ' +
								(section === 'profile' ? 'is-selected' : '')
							}
							onClick={() => {
								setSection('profile');
							}}
						>
							Profile
						</button>
						<button
							className={
								's-navigation--item ' +
								(section === 'activity' ? 'is-selected' : '')
							}
							onClick={() => {
								setSection('activity');
							}}
						>
							Activity
						</button>
					</div>
					{section === 'profile' && <UserSection user={user} />}
					{section === 'activity' && <UserActivityTab user={user} />}
				</div>
				{section === 'profile' && (
					<div className="row-grid">
						{/* <ExternalUserDetails/> */}
						{console.log(user)}
						<UserActivity userTgs={user?.tagsInformation} />
					</div>
				)}
			</div>
		</Fragment>
	);
};

ProfilePage.propTypes = {
	getProfile: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, { getProfile })(ProfilePage);
