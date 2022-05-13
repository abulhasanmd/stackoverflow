import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deletePost } from "../../../../redux/posts/posts.actions";

import TagBadge from "../../../../components/TagBadge/TagBadge.component";
import UserCard from "../../../../components/UserCard/UserCard.component";

import "./PostCell.styles.css";

// {
//   deletePost,
//   auth,
//   post: {
//     post: {id, post_body, tags, gravatar, user_id, username, created_at},
//   },
// }

//{post: {post: {id=12, post_body, tags, gravatar, user_id, username, created_at} }}
const PostCell = ({ deletePost, post: { post }, auth }) => {
  console.log("post is", post);

  // const [isAuthor, setIsAuthor] = React.useState(false);

  // useEffect(() => {
  //   if (post.user_id === auth.user.id) {
  //     setIsAuthor(true);
  //   }
  //  }, [post._id]);

  const gravatar =
    "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&d=mm&r=g";
  const created_at = post.createdOn;
  const user_id = post?.createdBy?._id;
  const username = post?.createdBy?.name;
  // const { descr, tags, gravatar, user_id, username, created_at } = post1;

  return (
    <Fragment>
      <div className="post-cell">
        <div
          className="post-text fc-black-800"
          dangerouslySetInnerHTML={{ __html: post.descr }}
        ></div>
        <div className="post-tags fc-black-800">
          {post?.tags?.map((tag, index) => (
            <TagBadge
              key={index}
              tag_name={tag.name}
              size={"s-tag"}
              float={"left"}
            />
          ))}
        </div>
        {auth && auth.user && (auth.user.isAdmin == true) ? (
          <div className="admin-usercard">
            {" "}
            <UserCard
              created_at={created_at}
              user_id={user_id}
              gravatar={gravatar}
              username={username}
              reputation={post?.createdBy?.reputation}
            />
          </div>
        ) : (
          <div className="post-actions fc-black-800">
            
            <div className="post-actions-extended">
              <div className="post-btns">
                <div className="post-menu">
                  <Link
                    className="post-links"
                    title="short permalink to this question"
                    to="/"
                  >
                    share
                  </Link>
                  <Link
                    className="post-links"
                    title="Follow this question to receive notifications"
                    to="/"
                  >
                    follow
                  </Link>
                  {!auth.loading &&
                    auth.isAuthenticated &&
                    user_id === auth.user.userId && (
                      <Link
                        className="s-link s-link__danger"
                        style={{ paddingLeft: "4px" }}
                        title="Delete the post"
                        onClick={() => deletePost(post.id)}
                        to="/questions"
                      >
                        delete
                      </Link>
                    )}
                </div>
              </div>

              <UserCard
                created_at={created_at}
                user_id={user_id}
                gravatar={gravatar}
                username={username}
                reputation={post?.createdBy?.reputation}
              />
            </div>
            
          </div>
        )}
      </div>
    </Fragment>
  );
};

PostCell.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

// connect(mapStateToProps, {deletePost})
// connect(mapStateToProps, {deletePost})

// export default (PostCell);
export default connect(mapStateToProps, { deletePost })(PostCell);
