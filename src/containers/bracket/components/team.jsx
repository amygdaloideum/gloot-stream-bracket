import React from 'react';
import styled, { css } from 'styled-components';

const determineIndicatorColor = result => {
  if (result === '00:00') return 'red';
  if (result === '-') return 'rgba(240,240,240, .35)';
  return '#00cd64';
};

const Wrapper = styled.div`
  display: flex;
  color: #f0f0f0;
  margin-bottom: 17px;
`;

const Position = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 185px;
  background: rgba(0, 0, 0, 0.5);
  margin-right: 8px;
`;

const Members = styled.div`
  width: 292px;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  background: #282828;
  ${props => (props.isSum ? 'background: #1e1e1e' : '')};
`;

const Time = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 100%;
  background: #1e1e1e;
  ${props =>
    props.isSum &&
    css`
      color: ${props => determineIndicatorColor(props.result)};
    `}
`;

const Indicator = styled.div`
  height: 46px;
  margin-right: 8px;
  width: 6px;
  min-width: 6px;
  background: ${props => determineIndicatorColor(props.result)};
`;

const Key = styled.div`
  display: flex;
  align-items: center;
`;

export default function Team({ team, ...rest }) {
  return (
    <Wrapper {...rest}>
      <Position>#{team.idx + 1}</Position>
      <Members>
        {Object.keys(team)
          .slice(0, 4)
          .map((key, i) => (
            <Row isSum={i === 3}>
              <Key>
                <Indicator result={team[key]}></Indicator>
                <span>{key}</span>
              </Key>
              <Time isSum={i === 3} result={team[key]}>
                {team[key]}
              </Time>
            </Row>
          ))}
      </Members>
    </Wrapper>
  );
}
