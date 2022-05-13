import React, { useEffect, Fragment, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../redux/posts/posts.actions";

import PageTitle from "../../components/PageTitle/PageTitle.component";
import Spinner from "../../components/Spinner/Spinner";
// import QuestionSection from "../Post/QuestionSection/QuestionSection";
import "../Post/Post.styles.css";
import "../Post/QuestionSection/QuestionSection.styles.css";
import PostCell from "../Post/QuestionSection/PostCell/PostCell";
import { KAFKA_MIDDLEWARE_URL } from "../../config/configBackend";
import "./AdminPost.css";
//{getPost, post: {post, loading}, match}
const AdminPost = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();
  // const [isQuestionAuthor, setIsQuestionAuthor] = React.useState(false);
  useEffect(() => {
    getPost(id);
  }, [getPost]);
  const [message,setMessage] = useState('');
  const [messageClass,setMessageClass] = useState('');
  // if (post?.createdBy?._id == auth?.user?._id) {
  //   setIsQuestionAuthor(true);
  // }

  const updateStatus = (event) => {
    console.log("event is ", event);
    let reviewStatus = "";
    if (event.target.innerText == "Approve Question") {
      reviewStatus = "approved";
    } else {
      reviewStatus = "rejected";
    }
    fetch(KAFKA_MIDDLEWARE_URL + "admin/update-review-status", {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        reviewStatus,
      }),
    })
      .then((res) => res.json())
      .then((jsonresp) => {
        console.log(jsonresp);
        if (jsonresp.data) {
            setMessageClass("message_sucess");
          setMessage(jsonresp.data.message);
          post.reviewStatus=reviewStatus;
          setTimeout(() => {
            setMessage('');
          }, 3000);
        } else {
          console.log(
            "error occurred while adding tag",
            jsonresp.error.message
          );
          setMessageClass("message_error");
          setMessage(jsonresp.error.message);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
      })
      .catch();
  };
  return loading || post === null ? (
    <Spinner type="page" width="75px" height="200px" />
  ) : (
    <Fragment>
      <PageTitle title={`${post.title} - Stack Overflow`} />
      <div id="mainbar" className="post">
        <div className="question-header fc-black-800 pl24">
          <h1>{post.title}</h1>
        </div>
        <div className="question-date fc-black-800 pl24">
          <div className="grid-cell">
            <span className="fc-light">Asked</span>
            <time dateTime={moment(post.createdOn).fromNow(true)}>
              {moment(post.createdOn).fromNow(true)} ago
            </time>{" "}
            &nbsp;
            <span className="fc-light">Modified</span>
            <time dateTime={moment(post.createdOn).fromNow(true)}>
              {moment(post.createdOn).fromNow(true)} ago
            </time>{" "}
            &nbsp;
            {/* <span className="fc-light">Viewed </span>
            <span>{post?.views} times</span> */}
          </div>
        </div>
        <div className="question-main pl24 pt16">
          <div className="question">
            <div className="admin-post-layout">
              {/* <VoteCell
            answerCount={answer_count}
            commentCount={comment_count}
            tagCount={tags ? tags.length : 0}
          /> */}
              <PostCell isQuestionAuthor={false} />
            </div>
            <div className={messageClass}>{message}</div>
            <div className="adminpost_buttons">
              <button
                className="s-btn s-btn__primary adminpost_button"
                disabled={post.reviewStatus == "approved"}
                onClick={updateStatus}
              >
                Approve Question
              </button>
              <button
                className="s-btn s-btn__filled s-btn__danger adminpost_button"
                //   onClick={handleModalClose}
                disabled={post.reviewStatus == "rejected"}
                onClick={updateStatus}
              >
                Reject Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AdminPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost })(AdminPost);
