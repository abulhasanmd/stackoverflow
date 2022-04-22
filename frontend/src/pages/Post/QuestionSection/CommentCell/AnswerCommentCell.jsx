import React, { Fragment, useEffect } from 'react';
// useEffect, useState
import moment from 'moment';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
import {
  getComments,
  // deleteComment,
  // addComment,
} from '../../../../redux/comments/comments.actions';

// import Spinner from '../../../../components/spinner/Spinner';
import TagBadge from '../../../../components/TagBadge/TagBadge.component';
// import LinkButton from '../../../../components/link-button/LinkButton';

import './CommentCell.styles.css';


// {deleteComment,
// addComment,
// getComments,
// auth,
// comment,
// post: {post},
// }

// const PostCell = ({post: {post}}) => {
  const AnswerCommentCell = ({
    getComments,
    comment,
    answerId,
  }) => {
// const CommentCell = ({ comment: {comment} ,post: {post}}) => {
    // console.log("post id is",post._id);
    console.log("Answer id is",answerId);

      useEffect(() => {
        getComments(answerId);
        // eslint-disable-next-line
      }, [getComments]);
   ("comment is",comment);

  // const [formData, setFormData] = useState({
  //   body: '',
  // });

  // const {body} = formData;

  // const handleChange = (e) =>
  //   setFormData({...formData, [e.target.name]: e.target.value});

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // addComment(post.id, {body});
  //   setFormData({
  //     body: '',
  //   });
  // };

  // const comment1 = {
  //   body: '',
  //   created_at: '',
  //   user: {
  //     name: '',
  //     avatar: '',
  //   },
  //   comments: [
  //     {
  //       body: 'comment1',
  //       created_at: '2020-11-11',
  //       username: 'user1',

  //     }
  //   ]
  // }

  return (
    <Fragment>
      <div className='comments-cell'>
        <div className='comments'>
          <ul className='comments-list'>
            {
              // comment.loading === null ? (
              // <Spinner width='25px' height='25px' />
              // ) :
                (
              comment?.comments?.data?.map((comment, index) => (
                <li key={index} className='comments-item'>
                  <div className='comment-text fc-black-800'>
                    <div className='comment-body'>
                      <span className='body'>{comment?.comment}</span>
                      &nbsp;&ndash;&nbsp;
                      <TagBadge
                        tag_name={comment?.createdBy?.name? comment?.createdBy.name : "user name missing"}
                        size={'s-tag'}
                        link={`/users/${comment?.createdBy?._id}`}
                        display={'inline'}
                      />
                      <span
                        title={moment(comment?.created_at).fromNow(true)}
                        style={{color: '#959ca3 !important'}}
                        className='date fs-body1'
                      >
                        {moment(comment?.created_at).fromNow(true)} ago
                      </span>
                    </div>
                    {/* {!auth.loading &&
                      auth.isAuthenticated &&
                      comment.user_id === auth.user.id && (
                        <Link
                          className='s-tag s-tag__moderator'
                          style={{marginTop: '4px'}}
                          title='Delete the comment'
                          onClick={() => deleteComment(comment.id)}
                          to={`/questions/${post.id}`}
                        >
                          delete
                        </Link>
                      )} */}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className='add-comment'>
          <Fragment>
          <div>
                  <input
                    className='title-input s-input'
                    type='text'
                    name='body'
                    // value={body}
                    // onChange={(e) => handleChange(e)}
                    id='title'
                    placeholder='Leave a comment'
                  />
                </div>
          </Fragment>
          {/* {!auth.loading && auth.isAuthenticated ? (
            <Fragment>
              <form className='comment-form' onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <input
                    className='title-input s-input'
                    type='text'
                    name='body'
                    value={body}
                    onChange={(e) => handleChange(e)}
                    id='title'
                    placeholder='Leave a comment'
                  />
                </div>
              </form>
            </Fragment>
          ) : (
            <Fragment>
              <LinkButton
                text={'You need to login to add a comment'}
                link={'/login'}
              />
            </Fragment>
          )} */}
        </div>
      </div>
    </Fragment>
  );
};


AnswerCommentCell.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
  comment: state.comment,
});

export default connect(mapStateToProps, {
  // deleteComment,
  getComments,
  // addComment,
})(AnswerCommentCell);
