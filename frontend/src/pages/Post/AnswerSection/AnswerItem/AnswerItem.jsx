import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {deleteAnswer} from '../../../../redux/answers/answers.actions';
import { FcCheckmark } from 'react-icons/fc'
// import {ReactComponent as UpVote} from '../../../../assets/ArrowUpLg.svg';
// import {ReactComponent as DownVote} from '../../../../assets/ArrowDownLg.svg';
import UserCard from '../../../../components/UserCard/UserCard.component';
import { addVoteToPost, getPost } from '../../../../redux/posts/posts.actions';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
// import { getPosts } from '../../../../redux/posts/posts.actions';
// addPostToBookmark
import './AnswerItem.styles.css';



const AnswerItem =({
  deleteAnswer,
  answer,
  // answer: {body, user_id, gravatar, vote, id, created_at, username},
  post: {post},
  auth,
}) => {
  console.log("answer is");
  const [voted, setVoted] = React.useState(false);
  const userId = auth?.user?._id;
  const authorId = answer?.createdBy?._id;

  useEffect(() => {
    getPost(post?._id);
  }, [voted])

  console.log(userId,"userId");
  console.log(authorId, "authorId");

const handleVote = (id, type) => {
  console.log("vote is", type, id);
  console.log("type is",type);
  console.log("vote clicked");

  if (userId !== authorId) {
    setVoted(prev => !prev);
    addVoteToPost({
      createdBy: userId,
      resourceType:"ans",
      resourceId: id,
      score:type == "up" ? 10 : -10,
      votes: type == "up" ? 1 : -1,
    })
  } else {
    console.log("author clicked the vote button");
  }
}

  return (
    <Fragment>
      <div className='answer-layout'>
        <div className='vote-cell'>
          <div className='vote-container'>
            <button
              className='vote-up'
              title='This answer is useful (click again to undo)'
              style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}
              onClick = {() => handleVote(answer?._id, 'up')}
            >
              <GoTriangleUp style={{
                fontSize: "40px",
                color: '#808080',
              }} />
            </button>
            <div className='vote-count fc-black-500'>{answer?.vote}</div>
            <button
              className='vote-down'
              title='This answer is not useful (click again to undo)'
              style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}
              onClick = {() => handleVote(answer?._id, 'down')}
            >
              <GoTriangleDown style={{
                fontSize: "40px",
                color: '#808080',
              }} />
            </button>
            {answer?.isBestAnswer ? <FcCheckmark style={{ fontSize: "30px", marginLeft: "3px" }} /> : null }
          </div>
        </div>
        {/* <div className ='vote-cell'> */}
          {/* /> */}
        {/* </div> */}
        <div className='answer-item' style={{marginLeft: "20px"}}>
          <div className='answer-content fc-black-800' dangerouslySetInnerHTML={{__html: answer?.answer}}>
          </div>
          <div className='answer-actions'>
            <div className='action-btns'>
              <div className='answer-menu'>
                <Link
                  className='answer-links'
                  title='short permalink to this question'
                  to='/'
                >
                  share
                </Link>
                <Link
                  className='answer-links'
                  title='Follow this question to receive notifications'
                  to='/'
                >
                  follow
                </Link>
                {!auth.loading &&
                  auth.isAuthenticated &&
                  answer?.createdBy?._id === auth?.user?._id && (
                    <Link
                      className='s-link s-link__danger'
                      style={{paddingLeft: '4px'}}
                      title='Delete the answer'
                      onClick={() => deleteAnswer(post._id)}
                      to={`/questions/${post._id}`}
                    >
                      delete
                    </Link>
                  )}
              </div>
            </div>
            <UserCard
              created_at={answer?.createdOn}
              user_id={answer?.createdBy?._id}
              gravatar="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
              username={answer?.createdBy?.name}
              float={'right'}
              backgroundColor={'transparent'}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AnswerItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {deleteAnswer})(AnswerItem);
