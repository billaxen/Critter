import { useContext, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";

const NewTweetInput = ({ addTweet }) => {
  const { status, setStatus } = useContext(CurrentUserContext);
  const [value, setValue] = useState("");
  const remainingChars = 200 - value.length;
  const warning = remainingChars <= 55 && remainingChars >= 0;
  const exceeded = remainingChars < 0 || remainingChars === 200;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (remainingChars >= 0 && remainingChars < 200) {

      addTweet(value);
      setValue("");
    }
  };

  return (
    <Container>
      <Label>Tweet:</Label>
      <Textarea
        value={value}
        onChange={handleChange}
        placeholder="What's happening?"
        warning={warning}
        exceeded={exceeded}
      />
      <CharacterCount warning={warning} exceeded={exceeded}>
        {remainingChars}
      </CharacterCount>
      <Button disabled={exceeded} onClick={handleSubmit}>
        Meow
      </Button>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Label = styled.label`
  margin-bottom: 8px;
  display: block;
  font-weight: bold;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;

  ${(props) =>
    props.warning &&
    `
        border-color: yellow;
      `}

  ${(props) =>
    props.exceeded &&
    `
        border-color: red;
      `}
`;

const CharacterCount = styled.span`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 12.8px;

  ${(props) =>
    props.warning &&
    `
        color: orange;
      `}

  ${(props) =>
    props.exceeded &&
    `
        color: red;
      `}
`;

const Button = styled.button`
  display: block;
  margin-top: 8px;
  padding: 8px 16px;
  background-color: #5d2eff;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    `
        opacity: 0.5;
        cursor: not-allowed;
      `}
`;

export default NewTweetInput;
