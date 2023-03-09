import React, { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

import ActionButtons from "./ActionButtons";

const Tweet = ({ tweet }) => {
  const { status, setStatus, currentUser } = useContext(CurrentUserContext);

  const tweetDate = new Date(tweet.timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const handleProfileLinkClick = (e) => {
    e.stopPropagation();
  };

  const handleTweetClick = () => {
    console.log("Tweet clicked");
  };

  const handleActionButtonClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Section>
      <TweetLink to={`/tweet/${tweet.id}`}>
        <TweetAuthor>
          <AvatarPic
            src={tweet.author.avatarSrc}
            alt={tweet.author.displayName}
          />
          <div>
            <Name>
              <ProfileLink
                to={`/${tweet.author.handle}`}
                onClick={handleProfileLinkClick}
              >
                {tweet.author.displayName}
              </ProfileLink>
            </Name>{" "}
            @{tweet.author.handle} - {tweetDate}
            <Status>{tweet.status}</Status>
          </div>
        </TweetAuthor>
        {tweet.media &&
          tweet.media.map((mediaItem, index) => (
            <div key={index}>
              {mediaItem.type === "img" && (
                <Pic src={mediaItem.url} alt="tweet media" />
              )}
            </div>
          ))}
      </TweetLink>
      <ActionButtonsWrapper onClick={handleActionButtonClick}>
        <ActionButtons />
      </ActionButtonsWrapper>
    </Section>
  );
};

const Pic = styled.img`
  max-width: 100%;
  border-radius: 20px;
`;

const AvatarPic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const Status = styled.p`
  margin: 0px;
`;

const TweetAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.span`
  font-weight: bold;
`;

const Section = styled.div`
  border: 1px solid white;
  padding: 20px;
  box-shadow: 1px 1px 1px 1px gray;
  cursor: pointer;
`;

const ProfileLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ActionButtonsWrapper = styled.div`
  margin-top: 10px;
`;

const TweetLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default Tweet;
