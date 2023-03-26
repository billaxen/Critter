import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorMessage = () => {
    return (
      <eMessage>
        <p>An unknown error has occurred.</p>
        <p>
          Please try refreshing the page, or{" "}
          <Link to="#">contact support</Link> if the problem persists.
        </p>
      </eMessage>
    );
  };

  const eMessage = styled.div`
  color: black;
  text-align: center;
`;

export default ErrorMessage