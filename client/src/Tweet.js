import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

import ActionButtons from "./ActionButtons";

const Tweet = ({ tweet, handle }) => {
  const { status, setStatus, currentUser } = useContext(CurrentUserContext);

  const tweetDate = new Date(tweet.timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Section>
      <TweetAuthor>
        <AvatarPic
          src={tweet.author.avatarSrc}
          alt={tweet.author.displayName}
        />
        <div>
          <Name>
            <ProfileLink to={`/${tweet.author.handle}`}>
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
      <ActionButtons />
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
  margin-bottom: 20px;
  align-items: center;
`;

const Name = styled.span`
  font-weight: bold;
`;

const Section = styled.div`
  border: 1px solid white;
  padding: 20px;
  box-shadow: 1px 1px 1px 1px gray;
`;

const ProfileLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
export default Tweet;
