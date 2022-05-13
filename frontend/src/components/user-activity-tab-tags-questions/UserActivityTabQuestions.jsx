/* eslint-disable no-mixed-spaces-and-tabs */
/////
import React from 'react';
import './UserActivityTabQuestions.css';
import PostItemProfile from '../../components/PostItemProfile/PostItemProfile.component';
const UserActivityTabQuestions = ({user}) => {
	console.log(user);
	// const posts = [{

	// }]
	return (
		<div className='questions'>
			<h2>Questions</h2>
          {user.topUserQuestions?.filter((post) => post.title.toLowerCase())  ///.includes(searchQuery ? searchQuery : '')
            .map((post, index) => (
              <PostItemProfile key={index} post={post} />
            ))}
        </div>
	);
}


export default UserActivityTabQuestions;