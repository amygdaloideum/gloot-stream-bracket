import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 20px;
  font-family: Impact, Charcoal, sans-serif;
`;

const StyledInput = styled.input`
  font-size: 20px;
`;

let socket;

export default function(props) {
  const [contender1, setContender1] = useState("");

  const [contender2, setContender2] = useState("");

  useEffect(() => {
    socket = io("http://localhost:3000");
  }, []);

  const sendNames = () => {
    socket.emit("SHOW_PAIR", JSON.stringify([contender1, contender2]));
  };

  return (
    <div>
      <center>
        Admin
        <br />
        <br />
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
        <br />
        <br />
        <StyledButton onClick={sendNames}>Send</StyledButton>
      </center>
    </div>
  );
}
