import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import Tweet from "./Tweet";
import styled from "styled-components";
import NewTweetInput from "./NewTweet";

const HomeFeed = () => {
  const { status, setStatus } = useContext(CurrentUserContext);
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setStatus("loading");
    fetch("/api/me/home-feed")
      .then((response) => response.json())
      .then((data) => {
        setTweets(data.tweetIds.map((id) => data.tweetsById[id]));
      })
      .then(setStatus("idle"))
      .catch((error) => {
        setError(true);
        console.error(error);
      });
  }, [status]);

  const addTweet = (newTweet) => {
    setStatus("loading");
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        status: newTweet,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTweets((prevTweets) => [data.tweet, ...prevTweets]);

        setStatus("idle");
      })
      .catch((error) => console.error(error));
  };

  return (
    <HomePage>
      <h1>HOME</h1>
      <NewTweetInput addTweet={addTweet} />
      <AllTweets>
        {status === "idle" &&
          tweets.map((tweet) => {
            console.log(tweet);
            return (
              <SingleTweet>
                <Tweet key={tweet.id} tweet={tweet} />
              </SingleTweet>
            );
          })}
      </AllTweets>
    </HomePage>
  );
};

const SingleTweet = styled.div`
  margin: 10px;
  text-decoration: none;
`;

const AllTweets = styled.div`
  text-decoration: none;
`;

const HomePage = styled.div`
  width: 80vh;
  margin-left: 50px;
  position: relative;
`;

export default HomeFeed;
