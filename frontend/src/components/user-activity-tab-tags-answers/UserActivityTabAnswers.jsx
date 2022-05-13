/* eslint-disable no-mixed-spaces-and-tabs */
/////
import React from 'react';
import './UserActivityTabAnswers.css';
import PostItemProfileAnswer from '../../components/PostItemProfileAnswer/PostItemProfileAnswer.component';
const UserActivityTabAnswers = ({user}) => {
	console.log(user);
	// const posts = [{

	// }]
	return (
		<div className='questions'>
			<h1>Answered Questions</h1>
          {user.questionsUserAnswered?.filter((post) => post.title.toLowerCase())  ///.includes(searchQuery ? searchQuery : '')
            .map((post, index) => (
              <PostItemProfileAnswer key={index} post={post} />
            ))}
        </div>
	);
}


export default UserActivityTabAnswers;