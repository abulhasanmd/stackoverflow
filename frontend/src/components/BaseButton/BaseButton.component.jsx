import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
const BaseButton = ({text, selected, onClick}) => {
  return (
    <Fragment>
      <button
        className={`s-btn s-btn__filled ${
          selected === text ? 'is-selected' : ''
        }`}
        style={{margin: '0'}}
        onClick={onClick}
      >
        {text}
      </button>
    </Fragment>
  );
};

BaseButton.propTypes = {
  text: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func

}
export default BaseButton;
