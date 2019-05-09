import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: 20px;
  font-family: Impact, Charcoal, sans-serif;
`;

const StyledInput = styled.input`
  font-size: 20px;
`;

const Title = styled.h1`
  color: white;
  font-size: 3rem;
`;

const Button = styled.button`
  height: 3rem;
  font-size: 2rem;
`;

const SquareButton = styled.button`
  height: 3rem;
  width: 3rem;
  font-size: 2rem;
`;

let socket;

export default function(props) {
  const [contender1, setContender1] = useState('');
  const [contender2, setContender2] = useState('');
  const [score2, setScore2] = useState(0);
  const [score1, setScore1] = useState(0);
  const [isScoreHidden, setIsScoreHidden] = useState(false);

  useEffect(() => {
    socket = io('http://localhost:3000');
  }, []);

  const sendNames = () => {
    socket.emit('SHOW_PAIR', JSON.stringify([contender1, contender2]));
  };

  const toggleHide = () => {
    setIsScoreHidden(!isScoreHidden);
    socket.emit('SET_HIDDEN', JSON.stringify(!isScoreHidden));
  };

  const handleScoreInput = (which, value) => {
    if (which === 1) {
      setScore1(value);
      socket.emit('UPDATE_SCORE', JSON.stringify([value, score2]));
    } else {
      setScore2(value);
      socket.emit('UPDATE_SCORE', JSON.stringify([score1, value]));
    }
  };

  const handleReset = () => {
    setScore1(0);
    setScore2(0);
    socket.emit('UPDATE_SCORE', JSON.stringify([0, 0]));
  };

  return (
    <div>
      <center>
        <Title>plates</Title>
        <div>
          <StyledInput
            onChange={e => setContender1(e.target.value)}
            value={contender1}
            type="text"
            name="contender1"
            placeholder="Player One"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <StyledInput
            onChange={e => setContender2(e.target.value)}
            value={contender2}
            type="text"
            name="contender2"
            placeholder="Player Two"
          />
        </div>
        <Button onClick={sendNames}>Send</Button>
        <br />
        <Title>Score</Title>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <StyledInput
              onChange={e => handleScoreInput(1, e.target.value)}
              value={score1}
              type="number"
              name="contender2"
              placeholder="score 1"
            />
            <div>
              <SquareButton onClick={() => handleScoreInput(1, score1 -1)}>-</SquareButton>
              <SquareButton onClick={() => handleScoreInput(1, score1 +1)}>+</SquareButton>
            </div>
          </div>

          <div>
            <StyledInput
              onChange={e => handleScoreInput(2, e.target.value)}
              value={score2}
              type="number"
              name="score2"
              placeholder="score 2"
            />
            <div>
              <SquareButton onClick={() => handleScoreInput(2, score2 -1)}>-</SquareButton>
              <SquareButton onClick={() => handleScoreInput(2, score2 + 1)}>+</SquareButton>
            </div>
          </div>
        </div>
        <Button onClick={handleReset}>reset</Button>
        <Button onClick={toggleHide}>{isScoreHidden ? 'show' : 'hide'}</Button>
      </center>
    </div>
  );
}
