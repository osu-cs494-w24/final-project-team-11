import { css } from '@emotion/react';
import styled from '@emotion/styled';

const SpinnerContainer = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin: 100px auto;

  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgb(255, 128, 0);
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: bounce 2s infinite ease-in-out;
  }

  .double-bounce2 {
    animation-delay: -1s;
  }

  @keyframes bounce {
    0%, 100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
`;

export default function Spinner() {
  return (
    <SpinnerContainer>
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </SpinnerContainer>
  );
}