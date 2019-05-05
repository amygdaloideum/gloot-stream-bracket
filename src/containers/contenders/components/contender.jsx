import React from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";
import glootIcon from "../gloot-logo.png";

const Wrapper = styled.div`
    display: inline-flex;
    transition: all 1s ease-in-out;
`;

const NameWrapper = styled.div`
  background-color: ${colors.lightGrey};
  color: ${colors.white};
  font-size: 32px;
  height: 70px;
  width: 390px;
  border: 1px solid ${colors.green};
  border-left: 0;
  border-radius: 0 5px 5px 0;
  justify-content: center;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
`;

const IconWrapper = styled.img`
  background-color: ${colors.lightGrey};
  
  height: 70px;
  width: 70px;
  border: 1px solid ${colors.green};
  border-right: 0;
  border-radius: 50% 0 0 50%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
`;

export default function Contenders({children, ...rest}) {
  return (
    <Wrapper {...rest}>
      <IconWrapper src={glootIcon} />
      <NameWrapper>{children}</NameWrapper>
    </Wrapper>
  );
}
