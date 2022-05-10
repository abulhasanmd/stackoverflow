import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// import CommentCell from './CommentCell/CommentCell';
import VoteCell from './VoteCell/VoteCell';
import PostCell from './PostCell/PostCell';

import './QuestionSection.styles.css';
//   {
//   post: {
//     post: {answer_count, comment_count, tags},
//   },
// }
const QuestionSection = () => {
  const post = {
    answer_count: 2,
    comment_count: 3,
    tags: ['react', 'redux', 'react-redux'],
  }

  const { answer_count, comment_count, tags } = post;

  return (
    <Fragment>
      <div className='question'>
        <div className='post-layout'>
          <VoteCell
            answerCount={answer_count}
            commentCount={comment_count}
            tagCount={tags ? tags.length : 0}
          />
          <PostCell/>
          {/* <CommentCell/> */}
        </div>
      </div>
    </Fragment>
  );
};

QuestionSection.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, null)(QuestionSection);
