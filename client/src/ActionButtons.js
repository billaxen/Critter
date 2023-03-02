import { useState } from 'react';
import { Heart, Share, MessageCircle, Repeat } from 'react-feather';
import styled from 'styled-components';

const TweetButtons = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  }

  return (
    <Buttons>
      <Button><MessageCircle/></Button>
      <Button><Repeat/></Button>
      <Button onClick={handleLikeClick}>
        <Heart color={isLiked ? 'red' : 'black'} fill={isLiked ? 'red' : 'none'} />
      </Button>
      <Button><Share/></Button>
    </Buttons>
  )
}

const Buttons = styled.div`
  max-width: 50%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
`;

const Button = styled.button`
  border: none;
  background-color: white;
`;

export default TweetButtons;
