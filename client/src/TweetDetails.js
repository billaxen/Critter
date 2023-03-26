import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ActionButtons from "./ActionButtons";
import LoadingSpin from "react-loading-spin";


const TweetDetails = ({}) => {
  const { status, setStatus } = useContext(CurrentUserContext);
  const [tweetDate, setTweetDate]= useState(null)
  const[tweet, setTweet]= useState(null)
  const {tweetId}= useParams();


  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((response) => response.json())
      .then((data) => 
        setTweet(data)
      )

      .catch((error) => {
        console.error(error);
      })
        
  }, []);



    return (
      <>
            {tweet 
            ? 
            <>
         <Section>
      <TweetAuthor>
        <AvatarPic
          src={tweet.tweet.author.avatarSrc}
          alt={tweet.tweet.author.displayName}
        />
        <div>
          <Name>
            <ProfileLink to={`/${tweet.tweet.author.handle}`}>
              {tweet.tweet.author.displayName}
            </ProfileLink>
          </Name>{" "}
          @{tweet.tweet.author.handle}
           - {new Date(tweet.tweet.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}
          <Status>{tweet.tweet.status}</Status>
        </div>
      </TweetAuthor>
      {tweet.tweet.media &&
        tweet.tweet.media.map((mediaItem, index) => (
          <div key={index}>
            {mediaItem.type === "img" && (
              <Link to= {`/tweet/${tweet.tweet.id}`}>
                <Pic src={mediaItem.url} alt="tweet media" />
                </Link>
            )}
          </div>
        ))}
        
        {tweet && <ActionButtons tweet={tweet.tweet} />}
    </Section>
            </>
            : <><LoadingSpin /></>
            }
            </>
    
    )
    
    

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
  text-decoration: none;
  width: 60%;
`;

const ProfileLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {

  }
`;

  export default TweetDetails 