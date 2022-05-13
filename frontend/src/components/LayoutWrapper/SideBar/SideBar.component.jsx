import React from "react";

import SideBarItem from "./SideBarItem.component";
import { SideBarData, AdminSideBarData } from "./SideBarData";
import { connect } from "react-redux";
import "./SideBar.styles.css";

const SideBar = ({ user }) => (
  <div className="side-bar-container">
    {/* {console.log('user in sidebar is ',props.user)}{   console.log('user in sidebar is ',props)} */}

    <div className="side-bar-tabs">
      <SideBarItem isHome={true} link="/" text="Home" />

      <div className="public-tabs">
        <p className="title fc-light">PUBLIC</p>
        {SideBarData.map(({ link, icon, text }, index) => (
          <SideBarItem key={index} link={link} icon={icon} text={text} />
        ))}
        {user.isAdmin &&
          AdminSideBarData.map(({ link, icon, text }, index) => (
            <SideBarItem key={index} link={link} icon={icon} text={text} />
          ))}
      </div>
      <div className="teams-tabs">
        <p className="title fc-light">TEAMS</p>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  console.log(state);
  console.log(state.auth.user);
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(SideBar);
