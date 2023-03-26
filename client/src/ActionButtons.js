import React, { useState } from "react";
import styled from "styled-components";
import { Heart, MessageCircle, RefreshCcw, Share } from "react-feather";

const ActionButtons = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(tweet.numLikes);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setNumLikes(numLikes - 1);
    } else {
      setNumLikes(numLikes + 1);
    }
  };

  return (
    <Buttons>
      <Button onClick={handleLikeClick}>
        {isLiked ? (
          <HeartFill color="red" />
        ) : (
          <Heart color="black" />
        )}
        {numLikes > 0 && <LikeCount>{numLikes}</LikeCount>}
      </Button>
      <Button>
        <MessageCircle color="black" />
      </Button>
      <Button>
        <RefreshCcw color="black" />
      </Button>
      <Share/>
    </Buttons>
  );
};

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const HeartFill = styled(Heart)`
  fill: red;
`;

const LikeCount = styled.span`
  margin-left: 5px;
`;

export default ActionButtons;
