/* eslint react/prop-types: 0 */
import React, {Fragment} from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {FaCircle} from 'react-icons/fa';
import './UserCard.styles.css';

const UserCard = ({
  created_at,
  user_id,
  // gravatar,
  username,
  dateType,
  float,
  // backgroundColor,
}) => {
  return (
    <Fragment>
      <div
        className='owner'
        style={{float: float, backgroundColor: "#dde8f7d9", paddingLeft: "5px" }}
      >
        <div className='user-block fc-black-500'>
          <div className='action-time'>
            {dateType ? dateType : 'asked'} {moment(created_at).fromNow(true)}{' '}
            ago
          </div>
          <div className='user-logo'>
            <Link className='user-link' to={`/users/${user_id}`}>
              <div className='logo-wrapper'>
                <img
                  alt='user_logo'
                  src={"https://secure.gravatar.com/avatar/64?s=164&d=identicon"}
                />
              </div>
            </Link>
          </div>
          <div className='user-profile'>
            <Link
              className='user-profile-link fc-blue-600'
              to={`/users/${user_id}`}
            >
              {username}
            </Link>
          </div>
          <div style={{backgroundColor: "", padding:"0px 30px 0px 0px", }}>
					<span className='navbar-stats' style={{color: "#343434", fontSize: "12px", marginLeft: "10px"}}>45 </span>
					<span> <FaCircle style={{color:"#FFD700", fontSize: "10px" , paddingRight: "5px"}} /> </span>
					<span className='navbar-stats' style={{color: "#7B7676", fontSize: "10px"}}>1 </span>
					<span> <FaCircle style={{color:"#a9a9a9", fontSize: "10px", paddingRight: "5px"}} /> </span>
					<span className='navbar-stats' style={{color: "#7B7676", fontSize: "10px"}}>2 </span>
					<span> <FaCircle style={{color:"#964B00", fontSize: "10px", paddingRight: "5px"}} /> </span>
					<span className='navbar-stats' style={{color: "#7B7676", fontSize: "10px"}}>8 </span>
				</div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserCard;
