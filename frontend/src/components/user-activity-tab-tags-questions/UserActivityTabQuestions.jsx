/* eslint-disable no-mixed-spaces-and-tabs */
/////
import React from 'react';
import './UserActivityTabQuestions.css';
import PostItemProfile from '../../components/PostItemProfile/PostItemProfile.component';
const UserActivityTabQuestions = ({user}) => {
	
	// const posts = [{

	// }]
	return (
		<div className='questions'>
          <h1>Questions Asked</h1>
          {user.topUserQuestions?.map((post, index) => (
              <PostItemProfile key={index} post={post} />
            ))}
        </div>
	);
}


export default UserActivityTabQuestions;