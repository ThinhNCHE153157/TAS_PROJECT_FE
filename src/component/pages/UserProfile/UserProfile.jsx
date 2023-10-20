// import React from 'react';
// import './UserProfile.css';

// function UserProfile() {
//   return (
//     <div className="user-profile-container">
//          <div id='left'></div>
//          <div id='right'></div>
//     </div>
//   );
// }

// export default UserProfile;

import React from "react";
import styled from "styled-components";
import { Avatar, Container } from "@mui/material";

const UserProfileContainer = styled.div`
  display: flex;
  margin: 5% 10% 5% 10%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3cqh;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9;
  gap: 20px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
width: 30%; 
height: 100%; 
padding: 20px;
display: flex;
flex-direction: column;
align-items: center; 
gap: 10px
margin-left: 20px; 
margin-left: 20px; 
background-color: #7bc487;
`;

const RightColumn = styled.div`
  flex: 2;
  padding: 20px;
  margin-right: 20px;
  background-color: #7bc487;
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover; /* Đảm bảo hình ảnh không bị biến dạng */
`;

const Containers = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const MoreInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-right: 10px; /* Khoảng cách giữa các label và nội dung */
`;

function UserProfile() {
  return (
    <UserProfileContainer>
      <LeftColumn>
        <Avatar alt="User Image" src="default-user-image.jpg" />
        {/* <UserImage src="link-to-user-image.jpg" alt="User Image" /> */}
        <Containers>
          <p>Chose your image</p>
          <button>Browser</button>
        </Containers>
        <u>Nguyen Van A</u>
        <i>Teacher</i>
      </LeftColumn>
      {/*  */}
      <RightColumn>
        <MoreInformation>
          <p>More information</p>
        </MoreInformation>
        <LabelContainer>
          <label>First Name</label>
          <label>Last Name</label>
          <label>Password</label>
          <label>Email</label>
          <label>Address</label>
          <label>Phone</label>
          <label>Role</label>
          <label>Create Date</label>
          <label>Update Date</label>
          <label>Status</label>
        </LabelContainer>
      </RightColumn>
    </UserProfileContainer>
  );
}

export default UserProfile;
