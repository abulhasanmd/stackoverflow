/* eslint react/prop-types: 0 */
import React from 'react';
import moment from 'moment';
//import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TagBadge from '../../../components/TagBadge/TagBadge.component';

const TagPanel = ({tag: {name, descr, createdOn, questionsCount}}) => {
  return (
    <div className="grid--item s-card js-tag-cell d-flex fd-column">
      <div className="d-flex jc-space-between ai-center mb12">
        <TagBadge tag_name={name} size={'s-tag'} float={'left'} />
      </div>

      <div className="flex--item fc-medium mb12 v-truncate4">
        {descr}
      </div>

      <div className="mt-auto d-flex jc-space-between fs-caption fc-black-400">
        <div className="flex--item">{questionsCount} {questionsCount === 1 ? 'question' : 'questions'}</div>
        <div className="flex--item s-anchors s-anchors__inherit">
          added {moment(createdOn).fromNow(false)}
        </div>
      </div>
    </div>
  );
};

TagPanel.propTypes = {
  tag: PropTypes.object.isRequired,
};

//export default connect(null)(TagPanel);
export default TagPanel;
