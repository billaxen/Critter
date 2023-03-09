import Logo from "./logo";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookmarks from "./Bookmarks";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Profile from "./Profile";
import TweetDetails from "./TweetDetails";
import Sidebar from "./Sidebar";
import { CurrentUserContext, CurrentUserProvider } from "./CurrentUserContext";
import { useContext } from "react";
import styled from "styled-components";
import LoadingSpin from "react-loading-spin";

const App = () => {
  const { status, setStatus } = useContext(CurrentUserContext);
  const [currentUser, setCurrentUser] = React.useState(null);
  
  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <Page>
          <Side>
            <Logo />
            <Sidebar />
          </Side>

          <Center>
            {status === "loading" && (
              <Spin>
                <LoadingSpin />
              </Spin>
            )}
            {status === "idle" && (
              <Routes>
                <Route path="/" element={<HomeFeed />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/tweet/:tweetId" element={<TweetDetails />} />
                <Route path="/:profileId" element={<Profile />} />
              </Routes>
            )}
          </Center>
        </Page>
      </CurrentUserProvider>
    </BrowserRouter>
  );
};

const Center = styled.div``;
const Side = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Page = styled.div`
  display: flex;
`;
const Spin = styled.div`
  justify-content: center;
`;

export default App;
