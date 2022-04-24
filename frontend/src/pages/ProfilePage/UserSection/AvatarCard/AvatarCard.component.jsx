import React from "react";
import {Link} from "react-router-dom";

import './AvatarCard.styles.css';
//gravatar
const AvatarCard = ({ id, gravatar, views }) => (
  <div className='img-card'>
    <div className='avatar-card'>
      <div className='avatar'>
        <Link className='avatar-link' to={`/users/${id}`}>
          <div className='logo-wrapper'>
            <img
              src={gravatar ? gravatar : "https://secure.gravatar.com/avatar/64?s=164&d=identicon"}
              alt='user-logo'
            />
          </div>
        </Link>
      </div>
      <div className='title'>
        <div className='grid fc-black-800'>
          {views.slice(0,10)}
          &nbsp;
          <span className='fc-light'>Last Seen</span>
        </div>
      </div>
    </div>
  </div>
)

export default AvatarCard;