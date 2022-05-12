import React from "react";

import TagBadge from "../../../components/TagBadge/TagBadge.component";

import './UserActivity.styles.css';
//userTgs
const UserActivity = ({userTgs}) => {
console.log(userTgs);

const tagDiv = userTgs?.map((item, index) => {
      console.log(item);
        return (
              <>
                <div className='top-tags-cells'>
                <div className='top-cell'>
                  <div className='tag-cell bg-black-025'>
                    <TagBadge
                    key={index}
                      tag_name={item.name}
                      size={'s-tag s-tag__lg'}
                      float={'left'}
                    />
                    <div className='score'>
                      <div className='score-txt'>
                        <div className='score-tab'>
                          <span className='txt fc-light'>Question Count</span>
                          <span className='number fc-black-800'>{item.questionsCount}</span>
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
    </div>
  </div>
  )
}

export default UserActivity;