import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import Tweet from "./Tweet";
import styled from "styled-components";
import NewTweetInput from "./NewTweet";

const HomeFeed = () => {
  const { status, setStatus } = useContext(CurrentUserContext);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    setStatus("loading");
    fetch("/api/me/home-feed")
      .then((response) => response.json())
      .then((data) => {
        setTweets(data.tweetIds.map((id) => data.tweetsById[id]));
      })
      .then(setStatus("idle"))
      .catch((error) => console.error(error));
  }, []);

  const addTweet = (newTweet) => {
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newTweet,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTweets([data, ...tweets]);
      })
      .catch((error) => console.error(error));
  };

  return (
    <HomePage>
      <h1>HOME</h1>
      <NewTweetInput addTweet={addTweet} />
      <AllTweets>
        {tweets.length &&
          tweets.map((tweet) => (
            <SingleTweet>
              <Tweet key={tweet.id} tweet={tweet} />
            </SingleTweet>
          ))}
      </AllTweets>
    </HomePage>
  );
};

const SingleTweet = styled.div`
  margin: 10px;
`;

const AllTweets = styled.div``;

const HomePage = styled.div`
  width: 80vh;
  margin-left: 50px;
  position: relative;
`;

export default HomeFeed;
