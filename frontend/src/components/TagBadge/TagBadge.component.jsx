/* eslint react/prop-types: 0 */
import React, {Fragment, useState} from 'react';
//import {useNavigate} from 'react-router-dom';

import './TagBadge.styles.css';

const TagBadge = ({tag_name, size, display, float}) => {//, link, href
  //let history = useNavigate();
  let t = `[${tag_name}]`;
  const [val] = useState(t);


  // const handleSubmit = (e) => {
  //   console.log("Asas");
  //   e.preventDefault();
  //   history.push('/questions')
  // }
  return (
    <Fragment>
      <div className='tags-badge' style={{display, float}}>
        {/* {href === true ? (
          <a className={`${size}`} href={link ? link : `/questions/search?=${tag_name}`}>
            {tag_name}
          </a>
        ) : (
          <Link className={`${size}`} to={link ? link : `/questions/search?=${tag_name}`}>
            {tag_name}
          </Link>
        )} */}

            <form
						id="search"
            action="/questions"
						className={`grid--cell fl-grow1 searchbar px12 js-searchbar`}
						autoComplete="off"
					>
						<div className="ps-relative search-frame">
            <button className={`${size}`} type="submit" name="search"value={val}>{tag_name}</button>
							
						</div>
					</form>


      </div>
    </Fragment>
  );
};

export default TagBadge;
