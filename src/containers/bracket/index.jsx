import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import teamsData from './teams';
import Team from './components/team';

const timeStringToSeconds = ts => {
  const [mins, secs] = ts.split(':');
  return parseInt(mins) * 60 + parseInt(secs);
};

const secondsToTimeString = seconds => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${('00' + mins).substr(-2, 2)}:${('00' + secs).substr(-2, 2)}`;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const Bracket = styled.div.attrs({ className: 'bracket' })`
  display: flex;
  flex-direction: column;
  width: 1468px;
  height: 968px;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 818px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TitleSection = styled.div`
  text-align: center;
  width: 1076px;
  height: 54px;
  border-bottom: 2px solid #f0f0f0;
  color: #f0f0f0;
  background: #282828;
  font-size: 42px;
  margin-bottom: 94px;
`;

export default function() {
  const teams = teamsData
    .map(team => {
      const sum = Object.keys(team).reduce(
        (sum, val) =>
          team[val] === '-' || sum === '-'
            ? '-'
            : sum + timeStringToSeconds(team[val]),
        0
      );
      return {
        ...team,
        'Time Left': sum === '-' ? '-' : secondsToTimeString(sum),
      };
    })
    .sort((a, b) => {
      if(b['Time Left'] === '-') return -1;
      return (
        timeStringToSeconds(b['Time Left']) -
        timeStringToSeconds(a['Time Left'])
      );
    })
    .map((team, idx) => ({ ...team, idx }));
  console.log(teams);
  return (
    <Wrapper>
      <Bracket>
        <TitleWrapper>
          <TitleSection>Top 2 Teams to Final Round</TitleSection>
        </TitleWrapper>
        <TeamContainer>
          {teams.map((team, i) => (
            <Team key={i} team={team}></Team>
          ))}
        </TeamContainer>
      </Bracket>
    </Wrapper>
  );
}
