import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import bracket from './bracket';

const SUFFIX = 'px';
const PARTICIPANT_HEIGHT = 47;
const MATCH_MARGIN = 6;
const CONNECTOR_PADDING = PARTICIPANT_HEIGHT + MATCH_MARGIN;

const getDepthMultiplier = x => Math.pow(2, x - 1);

const determineIndicatorColor = props => {
  if (props.waiting) return colors.white;
  if (props.won) return colors.green;
  return colors.fadedWhite;
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bracket = styled.div.attrs({ className: 'bracket' })`
  display: flex;
`;

const Round = styled.div.attrs({ className: 'round' })`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .connector {
    padding: ${props => getDepthMultiplier(props.depth) * CONNECTOR_PADDING + SUFFIX} 0;
  }
`;

const RoundHeader = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  background-color: ${colors.darkGrey};
  width: 292px;
  height: 32px;
  margin: 0 12px;
  margin-bottom: 23px;
  color: ${colors.white};
  font-weight: bold;
  border-bottom: 2px solid ${colors.fadedWhite};
`;

const Matchup = styled.div.attrs({ className: 'matchup' })`
  display: flex;
  flex: 1 1 auto;
`;

const Matches = styled.div.attrs({ className: 'matches' })`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Match = styled.div.attrs({ className: 'match' })`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 6px 12px;
`;

const Participant = styled.div.attrs({ className: 'participant' })`
  display: flex;
  align-items: center;
  color: #858585;
  background: ${colors.lightGrey};
  width: 292px;
  height: 46px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
  &:not(:last-child) {
    margin-bottom: 2px;
  }
`;

const Indicator = styled.div`
  height: 100%;
  width: 6px;
  margin-right: 6px;
  background: ${props => determineIndicatorColor(props)};
`;

const Label = styled.div`
  color: ${props => (!props.won && !props.waiting ? colors.fadedWhite : colors.white)};
`;

const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 42px;
  background: ${colors.darkGrey};
  margin-left: auto;
  font-weight: bold;
  color: ${props => determineIndicatorColor(props)};
`;

const Connector = styled.div.attrs({ className: 'connector' })`
  position: relative;
  display: flex;
  align-items: center;
  width: 60px;
  &:before {
    content: '';
    height: 100%;
    width: 100%;
    border: 2px solid ${colors.white};
    border-left: none;
  }
  &:after {
    content: '';
    height: 1px;
    width: 100%;
    border-bottom: 2px solid ${colors.white};
  }
`;

export default function() {
  return (
    <Wrapper>
      <Bracket>
        {bracket.map(round => (
          <Round key={round.stage} depth={round.stage}>
            <RoundHeader>{round.name}</RoundHeader>
            {round.matchups.map(matchup => (
              <Matchup>
                <Matches>
                  {matchup.matches.map(match => (
                    <Match>
                      {match.participants.map(participant => (
                        <Participant>
                          <Indicator waiting={!match.done} won={participant.won} />
                          <Label waiting={!match.done} won={participant.won}>{participant.name}</Label>
                          <Score waiting={!match.done} won={participant.won}>{participant.score || '-'}</Score>
                        </Participant>
                      ))}
                    </Match>
                  ))}
                </Matches>
                {matchup.matches.length > 1 && <Connector />}
              </Matchup>
            ))}
          </Round>
        ))}
      </Bracket>
    </Wrapper>
  );
}
