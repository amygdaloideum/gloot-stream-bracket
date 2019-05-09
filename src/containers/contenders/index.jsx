import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Contender from './components/contender';
import styled from 'styled-components';
import colors from '../../styles/colors';

let socket;

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  transition: all 2s linear;
  height: 100%;
  width: 100%;
  padding: 120px 320px;
  justify-content: space-between;
  align-items: flex-end;
  overflow: hidden;
`;

const Score = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: white;
  color: ${colors.white};
  font-size: 4rem;
`;
const ScoreWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default function Contenders() {
  const [contenders, setContenders] = useState(['', '']);
  const [scores, setScores] = useState([0, 0]);
  const [isHidden, setIsHidden] = useState(false);

  const animationIn = () => {
    const c1 = document.getElementById('contender1');
    const c2 = document.getElementById('contender2');
    c1.style.transform = 'translateX(0px)';
    c2.style.transform = 'translateX(0px)';
  };
  const animationOut = () => {
    const c1 = document.getElementById('contender1');
    const c2 = document.getElementById('contender2');
    c1.style.transform = 'translateX(-1000px)';
    c2.style.transform = 'translateX(1000px)';
  };

  const startAnimation = () => {
    animationIn();
    setTimeout(animationOut, 4000);
  };

  const onMessage = msg => {
    setContenders(JSON.parse(msg));
    startAnimation();
  };

  const onScoreUpdate = msg => {
    setScores(JSON.parse(msg));
  };
  useEffect(() => {
    socket = io('http://localhost:3000');
    socket.on('SHOW_PAIR', onMessage);
    socket.on('UPDATE_SCORE', onScoreUpdate);
    socket.on('SET_HIDDEN', msg => setIsHidden(JSON.parse(msg)));
  }, []);

  const contender1 = contenders[0];
  const contender2 = contenders[1];

  return (
    <Wrapper>
      {!isHidden && (
        <ScoreWrapper>
          <Score>{scores[0].toString()}</Score>
          <Score>{scores[1].toString()}</Score>
        </ScoreWrapper>
      )}
      <ScoreWrapper>
        <Contender id="contender1" style={{ transform: 'translateX(-1000px)' }}>
          {contender1}
        </Contender>
        <Contender id="contender2" style={{ transform: 'translateX(1000px)' }}>
          {contender2}
        </Contender>
      </ScoreWrapper>
    </Wrapper>
  );
}
