import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingSpin from "react-loading-spin";
import { MapPin, Calendar } from "react-feather";

import { CurrentUserContext } from "./CurrentUserContext";
import Tweet from "./Tweet";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [isLoadingTweets, setIsLoadingTweets] = useState(false);
  const [error, setError] = useState(null);
  const { profileId } = useParams();

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((response) => response.json())
      .then((data) => setProfile(data.profile))
      .catch((error) => console.log(error));
  }, [profileId]);
  console.log(profile);
  useEffect(() => {
    if (profile) {
      fetch(`/api/${profile.handle}/feed`)
        .then((response) => response.json())
        .then((data) => {
          setTweets(data.tweetIds.map((id) => data.tweetsById[id]));
          setIsLoadingTweets(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoadingTweets(false);
          setTweets([]);
        });
    }
  }, [profile]);

  if (!profile) {
    return (
      <div>
        <LoadingSpin />
      </div>
    );
  }

  return (
    <ProfilePage>
      <Header>
        <Banner src={profile.bannerSrc} alt="treasurymog-banner" />
        <Picture src={profile.avatarSrc} alt="treasurymog-avatar" />
        <FollowButton>Follow</FollowButton>
      </Header>
      <ProfileInfo>
        <h2>{profile.displayName}</h2>
        <p>@{profile.handle}</p>
        <p>{profile.bio}</p>
        <p>
          <MapPin /> {profile.location} <Calendar /> Joined{" "}
          {new Date(profile.joined).toDateString()}
        </p>
        <p>
          {profile.numFollowing} Following {profile.numFollowers} Followers{" "}
        </p>
        <ProfileButtons>
        <TweetButton>Tweets</TweetButton>
        <ProfileButton>Media</ProfileButton>
        <ProfileButton>Likes</ProfileButton>

        </ProfileButtons>
      </ProfileInfo>

      {tweets.map((tweet) => (
        <SingleTweet key={tweet.id}>
          <Tweet tweet={tweet} />
        </SingleTweet>
      ))}
    </ProfilePage>
  );
};

const ProfilePage = styled.div`
  margin-left: 20px;
  width: 80vh;
`;

const Header = styled.div`
  position: relative;
  top: 0;
`;

const Picture = styled.img`
  width: 100px;
  height: 100px;
  border: 2px white solid;
  border-radius: 50%;
  margin-right: 15px;
  position: absolute;
  float: left;
  top: 150px;
  left: 20px;
`;

const FollowButton = styled.button`
  border: 2px solid purple;
  color: purple;
  padding: 5px;
  border-radius: 20px;
  background-color: white;
  position: absolute;
  float: left;
  top: 200px;
  left: 450px;
`;

const Banner = styled.img`
  position: relative;
  width: 80vh;
`;

const ProfileInfo = styled.div`
  margin-top: 75px;
`;

const ProfileButtons = styled.div`
display: flex;
`;

const ProfileButton = styled.button`
  width: 26vh;
`;

const SingleTweet = styled.div`
  margin: 10px;
`;

const TweetButton = styled.div`
width: 26vh;
background-color: darkgray;
align-items: center;
justify-content: center;
text-align: center;
`

export default Profile;
