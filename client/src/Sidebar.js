import React from "react";
import { Home, User, Bell, Bookmark } from "react-feather";
import styled from "styled-components";
import { COLORS } from "./constants";
import { NavLink } from "react-router-dom";
import { useContext} from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import LoadingSpin from "react-loading-spin";


const Sidebar = () => {
  const { currentUser} = useContext(CurrentUserContext);
  
  return (
    <>
      {currentUser ? (
        <>
          <Menu>
            <Link to="/">
              <Home />
              <p>Home</p>
            </Link>

            <Link to={`/${currentUser.handle}`}>
       
              <User />
              <p>Profile</p>
            </Link>

            <Link to="/notifications">
              <Bell />
              <p>Notifications</p>
            </Link>

            <Link to="/bookmarks">
              <Bookmark />
              <p>Bookmarks</p>
            </Link>

            <MeowButton> Meow</MeowButton>
          </Menu>
        </>
      ) : (
        <><LoadingSpin /></>
      )}
    </>
  );
};

const Menu = styled.div`
  min-width: 20%;
`;

const Link = styled(NavLink)`
  /* default styles here */
  display: flex;
  align-items: center;
  gap: 8px;
  p {
    color: black;
  }
  text-decoration: none;

  &.active {
    color: ${COLORS.blue};
    p {
      color: blue;
      border: 2px solid blue;
      border-radius: 5px;
      padding: 2px;
    }
  }
`;

const MeowButton = styled.button`
  border: 1px solid #5d2eff;
  border-radius: 20px;
  color: white;
  font-size: 15px;
  padding: 5px 40px 5px 40px;
  background-color: #5d2eff;
  text-align: center;
`;

export default Sidebar;
