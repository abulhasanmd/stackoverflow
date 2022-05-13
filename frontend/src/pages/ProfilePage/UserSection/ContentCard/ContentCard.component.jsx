import React from "react";
import moment from "moment";

import './ContentCard.styles.css';

const ContentCard = ({ username, answers_count, posts_count, reputation, reach, created_at, about, location, memberSince}) => (
  <div className='content-card'>
    <div className='content-grid'>
      <div className='info-cell'>
        <div className='info'>
          <div >
            <h1 style={{color: "#000"}}>{username}</h1>
          </div>
          <div className='date'>
            <p>
              User Created &nbsp;-&nbsp;
              {moment(created_at).fromNow(false)}
            </p>
          </div>
          <div className='date'>
            <p>
              About : {about}
            </p>
          </div>
          <div className='date'>
            <p>
              Member Since : {memberSince?.slice(0,10)}
            </p>
          </div>
          <div className='date'>
            <p>
              Location : {location}
            </p>
          </div>
        </div>
      </div>
      <div className='stats-cell'>
        <div className='count-sec'>
          <div className='counts'>
            <div className='cells'>
              <div className='column-grid'>
                <div className='head fc-black-700'>
                  {answers_count}
                </div>
                <div className='foot fc-black-500'>answers</div>
              </div>
            </div>
            <div className='cells'>
              <div className='column-grid'>
                <div className='head fc-black-700'>
                  {posts_count}
                </div>
                <div className='foot fc-black-500'>questions</div>
              </div>
            </div>
            <div className='cells'>
              <div className='column-grid'>
                <div className='head fc-black-700'>
                  {reputation}
                </div>
                <div className='foot fc-black-500'>Reputation</div>
              </div>
            </div>
            <div className='cells'>
              <div className='column-grid'>
                <div className='head fc-black-700'>
                  {reach}
                </div>
                <div className='foot fc-black-500'>Reach</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ContentCard;