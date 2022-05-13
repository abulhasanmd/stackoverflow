import React, { Fragment, useState, useEffect } from "react";

// import {useLocation} from 'react-router-dom';
// import {connect} from 'react-redux';
// import PropTypes from "prop-types";
// import { getPosts } from "../../redux/posts/posts.actions";
// import handleSorting from '../../services/handleSorting';

// import LinkButton from '../../components/link-button/LinkButton';
import PostItem from "../../components/PostItem/PostItem.component";
// import Spinner from "../../components/Spinner/Spinner";
// import ButtonGroup from '../../components/ButtonGroup/ButtonGroup.component';
// import SearchBox from '../../components/SearchBox/SearchBox.component';
// import PageTitle from '../../components/PageTitle/PageTitle.component';
import Pagination from "../../components/Pagination/Pagination.component";
import { KAFKA_MIDDLEWARE_URL } from "../../config/configBackend";
import "../QuestionsPage/QuestionsPage.styles.css";
import "./AllPendingQuestions.css";
const itemsPerPage = 10;

export default function AllPendingQuestions() {
  // const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // const params = new URLSearchParams(window.location.search)
    // let search = params.get('search')
    // searchQuery = URLSearchParams(useLocation().search).get('search')

    getPosts();
    // setSearchQuery(URLSearchParams(useLocation().search).get('search'));
  }, []);

  const getPosts = () => {
    fetch(KAFKA_MIDDLEWARE_URL + "admin/get-pending-questions", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((jsonresp) => {
        console.log(jsonresp);
        if (jsonresp.data) {
          console.log(jsonresp.data);
          setPosts(jsonresp.data);
        } else {
          console.log(
            "error occurred while adding tag",
            jsonresp.error.message
          );
        }
      })
      .catch();
  };
  console.log(posts);

  const [page, setPage] = useState(1);

  const handlePaginationChange = (e, value) => setPage(value);

  //return
  // loading || posts === null ? (
  //   <Spinner type='page' width='75px' height='200px' />
  // ) :
  return (
    <Fragment>
      <div id="mainbar" className="questions-page fc-black-800">
        <div className="questions-grid">
          <h3 className="questions-headline">Review Questions</h3>
        </div>
        <div className="questions">
          {/* {searchQuery ? () : ()} */}
          {posts.length<1 && <h1 className="noquestions">No Questions to be Reviewed</h1>}
          {posts
            .slice(
              (page - 1) * itemsPerPage,
              (page - 1) * itemsPerPage + itemsPerPage
            )
            .map((post, index) => (
              <PostItem key={index} post={{ ...post, isAdmin: true }} />
            ))}
        </div>
        {posts.length>0 &&  <Pagination
          page={page}
          itemList={posts}
          itemsPerPage={itemsPerPage}
          handlePaginationChange={handlePaginationChange}
        />}
      </div>
    </Fragment>
  );
}

// const mapStateToProps = (state) => ({
//   post: state.post,
// });

// export default connect(mapStateToProps, {getPosts})(AllPendingQuestions);
// export default QuestionsPage;
