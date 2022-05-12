import React from 'react';
//import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import htmlSubstring from '../../services/htmlSubstring'
import injectEllipsis from '../../services/injectEllipsis'

import UserCard from '../UserCard/UserCard.component';
import TagBadge from '../TagBadge/TagBadge.component';

import './PostItem.styles.css';

const PostItem = ({
  post: {
    _id,
    title,
    descr,
    createdBy,
    answer_count,
    // comment_count,
    views,
    createdOn,
    tags,
  },
}) => {
  const answerVoteUp = (
    <div className='vote answer'>
      <span className='vote-count fc-green-500'>5</span>
      <div className='count-text'>answers</div>
    </div>
  );

  const answerVoteDown = (
    <div className='vote'>
      <span className='vote-count'>5</span>
      <div className='count-text'>answers</div>
    </div>
  );

  return (
    <div className='posts'>
      <div className='stats-container fc-black-500'>
        <div className='stats'>
          <div className='vote'>
            <span className='vote-count'>{views}</span>
            <div className='count-text'>views</div>
          </div>
          {answer_count > 0 ? answerVoteUp : answerVoteDown}
          <div className='vote'>
            <span className='vote-count'>{tags.length}</span>
            <div className='count-text'>{tags.length > 1 ? "votes" : "vote" }</div>
          </div>
          {/* <div className='vote'>
            <div className='count-text'>{views} views</div>
          </div> */}
        </div>
      </div>
      <div className='summary'>
        <h3>
          <Link to={`/questions/${_id}`}>{title}</Link>
        </h3>
        <div className='brief' dangerouslySetInnerHTML={{__html: injectEllipsis(htmlSubstring(descr, 200))}}></div>
        {tags.map((tag, index) => (
          <TagBadge key={index} tag_name={tag.name} size={'s-tag'} float={'left'} />
        ))}
        <UserCard
          created_at={createdOn}
          user_id={createdBy._id}
          gravatar="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          username={createdBy.name}
          float={'right'}
          backgroundColor={'transparent'}
        />
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

//export default connect(null)(PostItem);
export default PostItem;
