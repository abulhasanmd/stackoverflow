import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {deleteAnswer} from '../../../../redux/answers/answers.actions';
import { FcCheckmark } from 'react-icons/fc'
import {ReactComponent as UpVote} from '../../../../assets/ArrowUpLg.svg';
import {ReactComponent as DownVote} from '../../../../assets/ArrowDownLg.svg';
// import UserCard from '../../../../components/UserCard/UserCard.component';

import './AnswerItem.styles.css';



const AnswerItem =({
  // deleteAnswer,
  answer,
  // answer: {body, user_id, gravatar, vote, id, created_at, username},
  // post: {post},
  // auth,
}) => {
// console.log("answer is", , "posts is ",post);
  // const answer1 = {
  //   body: 'This is body',
  //   user_id: 'asdfasdf',
  //   gravatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  //   id: 'asdfasdf',
  //   created_at: '2020-01-01',
  //   username: 'johndoe',
  // }

  // const {answer, user_id, gravatar, created_at, username} = answer1;

  return (
    <Fragment>
      <div className='answer-layout'>
        <div className='vote-cell'>
          <div className='vote-container'>
            <button
              className='vote-up'
              title='This answer is useful (click again to undo)'
              style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}
            >
              <UpVote className='icon' />
            </button>
            <div className='vote-count fc-black-500'>{answer?.vote}</div>
            <button
              className='vote-down'
              title='This answer is not useful (click again to undo)'
              style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}
            >
              <DownVote className='icon' />
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
                {/* {!auth.loading &&
                  auth.isAuthenticated &&
                  user_id === auth.user.id && (
                    <Link
                      className='s-link s-link__danger'
                      style={{paddingLeft: '4px'}}
                      title='Delete the answer'
                      onClick={() => deleteAnswer(id)}
                      to={`/questions/${post.id}`}
                    >
                      delete
                    </Link>
                  )} */}
              </div>
            </div>
            {/* <UserCard
              created_at={answer?.createdBy}
              user_id={user_id}
              gravatar={gravatar}
              username={username}
              dateType={'answered'}
              backgroundColor={'transparent'}
            /> */}
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
