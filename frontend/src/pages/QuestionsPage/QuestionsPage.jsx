import React, {Fragment, useState, useEffect} from 'react';

 import {useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts} from '../../redux/posts/posts.actions';
import handleSorting from '../../services/handleSorting';

import LinkButton from '../../components/link-button/LinkButton';
import PostItem from '../../components/PostItem/PostItem.component';
import Spinner from '../../components/Spinner/Spinner';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup.component';
import SearchBox from '../../components/SearchBox/SearchBox.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Pagination from "../../components/Pagination/Pagination.component";

import './QuestionsPage.styles.css';

const itemsPerPage = 10;


const QuestionsPage = ({ getPosts, post: { posts, loading },auth }) => {
  
  const [searchQuery] = useState(new URLSearchParams(useLocation().search).get('search'));
  console.log();
  //setSearchQuery(new URLSearchParams(useLocation().search).get('search'));
   useEffect(() => {
     if(searchQuery)
     {
      getPosts(searchQuery);
     }else{
      getPosts();
     }

  }, [getPosts]);


  console.log(posts)
  
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('Score');
  //let searchQuery = "";

  const handlePaginationChange = (e, value) => setPage(value);

  //return 
  // loading || posts === null ? (
  //   <Spinner type='page' width='75px' height='200px' />
  // ) : 
  return loading || posts === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      {searchQuery ? (
        <PageTitle
          title={`Search Results for ${searchQuery} - Stack Overflow`}
        />
      ) : (
        ''
      )}
      <div id='mainbar' className='questions-page fc-black-800'>
        <div className='questions-grid'>
          <h3 className='questions-headline'>
            {searchQuery ? 'Search Results' : 'All Questions'}
          </h3>
          {auth && auth.user && auth.isAuthenticated && <div className='questions-btn'>
            <LinkButton
              text={'Ask Question'}
              link={'/add/question'}
              type={'s-btn__primary'}
            />
          </div>}
        </div>
        {searchQuery ? (
          <div className='search-questions'>
            <span style={{color: '#acb2b8', fontSize: '12px'}}>
              Results for {searchQuery}
            </span>
            <SearchBox placeholder={'Search...'} name={'search'} pt={'mt8'} />
          </div>
        ) : (
          ''
        )}
        <div className='questions-tabs'>
          <span>
            {new Intl.NumberFormat('en-IN').format(posts?.length)} questions
          </span>
          <ButtonGroup
            buttons={['Interesting', 'Hot', 'Score', 'Unanswered']}
            selected={sortType}
            setSelected={setSortType}
          />
        </div>
          <div className='questions'>
            {/* {searchQuery ? () : ()} */}
          {posts?.filter((post) => post.title.toLowerCase())  ///.includes(searchQuery ? searchQuery : '')
            ?.sort(handleSorting(sortType))
            .slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)
            .map((post, index) => (
              <PostItem key={index} post={post} />
            ))}
        </div>
        <div className='sof-pagination'>
        <Pagination
          page={page}
          itemList={posts.filter((post) => post.title.toLowerCase().includes(searchQuery ? searchQuery : ''))}
          itemsPerPage={itemsPerPage}
          handlePaginationChange={handlePaginationChange}
        />
        </div>
      </div>
    </Fragment>
  );
};

QuestionsPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, {getPosts})(QuestionsPage);
// export default QuestionsPage;
