import React, {Fragment} from 'react';
// import React, {Fragment} from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import CommentCell from './CommentCell/CommentCell';
// import VoteCell from './VoteCell/VoteCell';
import PostCell from './PostCell/PostCell';
import {ReactComponent as UpVote} from '../../../assets/ArrowUpLg.svg';
import {ReactComponent as DownVote} from '../../../assets/ArrowDownLg.svg';
import './QuestionSection.styles.css';
import { BsBookmarkStar } from 'react-icons/bs'
import {MdOutlineHistory} from 'react-icons/md';
//   {
//   post: {
//     post: {answer_count, comment_count, tags},
//   },
// }


const QuestionSection = ({post: {post}}) => {
  
  console.log("Testing 1");

   

    // const createBookmark = async () => {
    //   let result = await axios.post(KAFKA_MIDDLEWARE_URL + "bookmarks/create-bookmark", {
    //     user_id: "627adb158fcc5a50ca6a7381",
    //     question_id: "627adb158fcc5a50ca6a7381",
    //     created_at: "2020-01-01",
    //     updated_at: "2020-01-01",
    //   });

    // const post = {
    //   // answer_count: 2,
    //   // comment_count: 3,
    //   tags: ['react', 'redux', 'react-redux'],
    // }
  
    // const { answer_count, comment_count, tags } = post;
  
  return (
    <Fragment>
      <div className='question'>
        <div className='post-layout'>
        <div className='vote-cell' style={{marginRight: "30px"}}>
          <div className='vote-container'>
            <button
              className='vote-up'
              title='This answer is useful (click again to undo)'
              style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}
            >
              <UpVote className='icon' />
            </button>
              <div className='fc-black-500' style={{fontSize: "22px", textAlign: "center"}}>{post?.votes}</div>
            <button
              className='vote-down'
              title='This answer is not useful (click again to undo)'
              style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}
            >
              <DownVote className='icon' />
            </button>
              <div className='vote-count fc-black-500' style={{marginLeft: "10px"}}>
              <BsBookmarkStar style={{fontSize: "20px", cursor: "pointer"}} />
            </div>
            <button
              className='vote-down'
              title='This answer is not useful (click again to undo)'
              style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}
            >
              </button>
              <div className='vote-count fc-black-500' style={{marginLeft: "10px"}}>
                <MdOutlineHistory style={{ fontSize: "20px", cursor: "pointer" }} />
              </div>
            {/* <div className='vote-count fc-black-500'>Activity</div> */}
            <button
              className='vote-down'
              title='This answer is not useful (click again to undo)'
              style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}
            >
            </button>
          </div>
          
        </div>
          {/* <VoteCell
            answerCount={answer_count}
            commentCount={comment_count}
            tagCount={tags ? tags.length : 0}
          /> */}
          <PostCell/>
          <CommentCell/>
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
