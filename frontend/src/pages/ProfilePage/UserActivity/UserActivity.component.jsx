import React from "react";
import { NavLink } from 'react-router-dom';
import TagBadge from "../../../components/TagBadge/TagBadge.component";

import './UserActivity.styles.css';
//userTgs
const UserActivity = ({userTgs}) => {
console.log(userTgs);

const tagDiv = userTgs && Object.keys(userTgs)?.map((item) => {
      console.log(item);
        return (
              <>
                <div className='top-tags-cells'>
                <div className='top-cell'>
                  <div className='tag-cell bg-black-025'>
                    <TagBadge
                    // key={}
                      tag_name={item}
                      size={'s-tag s-tag__lg'}
                      float={'left'}
                    />
                    <div className='score'>
                      <div className='score-txt'>
                        <div className='score-tab'>
                          <span className='txt fc-light'>Posts</span>
                          <span className='number fc-black-800'> {userTgs[item].posts}</span>
                        </div>
                        <div className='score-tab'>
                          <span className='txt fc-light'>Score</span>
                          <span className='number fc-black-800'>{userTgs[item].score}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </>
        );
        });

// const tagDiv = 




  return (
    <div className='grid-cell2'>
    <div className='top-tags'>
      <h3 className='fw-bold fc-dark bc-black-3'>Top Tags</h3>
      <div className='top-tags-sec'>
        {tagDiv}
      </div>
      <NavLink to="/tags"><h3 className='fw-bold fc-dark bc-black-3'>View All Tags</h3> </NavLink>
    </div>
  </div>
  )
}

export default UserActivity;