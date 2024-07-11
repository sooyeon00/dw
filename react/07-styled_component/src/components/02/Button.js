import React from "react";
import styled from "styled-components";
import icon from "./nail.png";

const Icon = styled.img.attrs({ src: icon })`
  width: 16px;
  height: 16px;
`;

const StyledButton = styled.button`
  background-color: #6750a4;
  border: none;
  color: #fff;
  padding: 16px;

  &:hover {
    ${Icon} {
      opacity: 0.2;
    }
  }

  & ${Icon} {
    margin-right: 4px;
  }
`;

function Button({ children }) {
  return (
    <StyledButton>
      <Icon />
      {children}
    </StyledButton>
  );
}

export default Button;
