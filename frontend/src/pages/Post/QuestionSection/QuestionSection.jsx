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
import { useParams } from 'react-router';
import {Link} from 'react-router-dom'
import {addPostToBookmark, addVoteToPost} from '../../../redux/posts/posts.actions';
import { setAlert } from '../../../redux/alert/alert.actions';
//   {
//   post: {
//     post: {answer_count, comment_count, tags},
//   },
// }


const QuestionSection = ({setAlert, addPostToBookmark,addVoteToPost,  post: {post}, auth}) => {
  
  let {id} = useParams();
  console.log("Question Section is",id);
  const userId = auth?.user?._id;
  const authorId = post?.createdBy?._id;
  // useEffect(() => {
  //   // let {id} = useParams()
  // }, [])

  // console.log(isQuestionAuthor, "from question section")
  let questionActivityUrl = `/questions/timeline/${id}` ;

    // const createBookmark = async () => {
    //   let result = await axios.post(KAFKA_MIDDLEWARE_URL + "bookmarks/create-bookmark", {
    //     user_id: "627adb158fcc5a50ca6a7381",
    //     question_id: "627adb158fcc5a50ca6a7381",
    //     created_at: "2020-01-01",
    //     updated_at: "2020-01-01",
    //   });
    console.log("auth is",auth)
    const handleVote = ((type) => {
      console.log("type is",type);
      console.log("vote clicked");
      if (userId !== authorId) {
      addVoteToPost({
        createdBy: auth?.user?._id,
        resourceType:"ques",
        resourceId: id,
        score:type == "up" ? 10 : -10,
        votes: type == "up" ? 1 : -1,
      })
    }else{
      console.log("author clicked the vote button");
    }
      
      });

      // const triggerAlert = () => {
      //   console.log("alert triggered")
      //   setAlert("Login to Vote!", 'error')
      //       };

      const handleBookmark = ((questionId) => {
        console.log("questionId is",questionId);
        console.log("userId is",userId);
        addPostToBookmark({questionId, userId:auth['user']._id});
        }); 

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
              onClick = {() => { (!auth.loading && auth.isAuthenticated) ? (handleVote("up"))  :  setAlert("Login to Vote!", 'error')
            }}
            >
              <UpVote className='icon' />
            </button>
              <div className='fc-black-500' style={{fontSize: "22px", textAlign: "center"}}>{post?.votes}</div>
            <button
              className='vote-down'
              title='This answer is not useful (click again to undo)'
              style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}
              onClick = {() => { !auth.loading && auth.isAuthenticated ? (handleVote("down")) : setAlert("Login to Vote!", 'error')
            }}
            >
              <DownVote className='icon' />
            </button>
              <div className='vote-count fc-black-500' style={{marginLeft: "10px"}}>
              <BsBookmarkStar style={{fontSize: "20px", cursor: "pointer"}} onClick = {() => handleBookmark(post._id)} />
            </div>
            <button
              className='vote-down'
              title='This answer is not useful (click again to undo)'
              style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}
            >
              </button>
              <div className='vote-count fc-black-500' style={{ marginLeft: "10px" }}>
                <Link to= {questionActivityUrl}>
                  <MdOutlineHistory style={{ fontSize: "20px", cursor: "pointer" }} />
                </Link>
                
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
          <PostCell />
          <CommentCell />
        </div>
      </div>
    </Fragment>
  );
};

QuestionSection.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addPostToBookmark: PropTypes.func.isRequired,
  addVoteToPost: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {addPostToBookmark, addVoteToPost, setAlert})(QuestionSection);
