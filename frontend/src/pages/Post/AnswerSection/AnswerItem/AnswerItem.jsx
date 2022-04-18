import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {deleteAnswer} from '../../../../redux/answers/answers.actions';

import {ReactComponent as UpVote} from '../../../../assets/ArrowUpLg.svg';
import {ReactComponent as DownVote} from '../../../../assets/ArrowDownLg.svg';
import UserCard from '../../../../components/UserCard/UserCard.component';

import './AnswerItem.styles.css';

// {
//   deleteAnswer,
//   answer: {body, user_id, gravatar, id, created_at, username},
//   post: {post},
//   auth,
// }

const AnswerItem =({post: {post}, answer}) => {
console.log("answer is", answer, "posts is ",post);
  const answer1 = {
    body: 'This is body',
    user_id: 'asdfasdf',
    gravatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    id: 'asdfasdf',
    created_at: '2020-01-01',
    username: 'johndoe',
  }

  const {body, user_id, gravatar, created_at, username} = answer1;

  return (
    <Fragment>
      <div className='answer-layout'>
        <div className='vote-cell'>
          <div className='vote-container'>
            <button
              className='vote-up'
              title='This answer is useful (click again to undo)'
            >
              <UpVote className='icon' />
            </button>
            <div className='vote-count fc-black-500'>0</div>
            <button
              className='vote-down'
              title='This answer is not useful (click again to undo)'
            >
              <DownVote className='icon' />
            </button>
          </div>
        </div>
        <div className='answer-item'>
          <div className='answer-content fc-black-800' dangerouslySetInnerHTML={{__html: body}}>
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
            <UserCard
              created_at={created_at}
              user_id={user_id}
              gravatar={gravatar}
              username={username}
              dateType={'answered'}
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
