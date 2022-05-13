/* eslint-disable react/prop-types */
import React, {useEffect, Fragment} from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPost} from '../../redux/posts/posts.actions';

import PageTitle from '../../components/PageTitle/PageTitle.component';
import LinkButton from '../../components/link-button/LinkButton';
import Spinner from '../../components/Spinner/Spinner';
import AnswerSection from './AnswerSection/AnswerSection';
import QuestionSection from './QuestionSection/QuestionSection';

import './Post.styles.css';

//{getPost, post: {post, loading}, match}
const Post = ({getPost, post: {post, loading}}) => {
  const { id } = useParams();
  // const [isQuestionAuthor, setIsQuestionAuthor] = React.useState(false);
  useEffect(() => {
    getPost(id);
  }, [getPost]);

  console.log(post, "post is");

  // if (post?.createdBy?._id == auth?.user?._id) { 
  //   setIsQuestionAuthor(true);
  // }


  return  (
    loading || post === null ? (
      <Spinner type='page' width='75px' height='200px' />
    ) :
    <Fragment>
      <PageTitle title={`${post.title} - Stack Overflow`} />
      <div id='mainbar' className='post'>
        <div className='question-header fc-black-800 pl24'>
          <h1>{post.title}</h1>
          <div>
            <LinkButton
              text={'Ask Question'}
              link={'/add/question'}
              type={'s-btn__primary'}
            />
          </div>
        </div>
        <div className='question-date fc-black-800 pl24'>
          <div className='grid-cell'>
            <span className='fc-light'>Asked</span>
            <time dateTime={moment(post.createdOn).fromNow(true)}>
              {moment(post.createdOn).fromNow(true)} ago
            </time> &nbsp;
            <span className='fc-light'>Modified</span>
            <time dateTime={moment(post.modifiedOn).fromNow(true)}>
              {moment(post.createdOn).fromNow(true)} ago
            </time> &nbsp;
            <span className='fc-light'>Viewed </span>
            <span>{post?.views} times</span>
          </div>
          </div>
        <div className='question-main pl24 pt16'>
            <QuestionSection/>
            <AnswerSection />
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {getPost})(Post);
