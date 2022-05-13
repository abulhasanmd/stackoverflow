import React from "react";

import AvatarCard from "./AvatarCard/AvatarCard.component";
import ContentCard from "./ContentCard/ContentCard.component";

import './UserSection.styles.css';

const UserSection = ({ user }) => (
  <div className='grid'>
    <AvatarCard
      id={user?._id}
      gravatar="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
      views={user?.lastSeen}
    />
    <ContentCard
      username={user?.name}
      answers_count={user?.questionsAnswered}
      posts_count={user?.questionsAsked}
      reputation={user?.reputation}
      reach={user?.reach}
      created_at={user?.createdOn}
      about = {user?.about}
      location = {user?.location}
      memberSince = {user?.createdOn}
    />
  </div>
)

export default UserSection;