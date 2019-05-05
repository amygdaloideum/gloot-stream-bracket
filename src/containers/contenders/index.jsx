import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Contender from "./components/contender";
import styled from "styled-components";

let socket;

const Wrapper = styled.div`
  display: inline-flex;
  transition: all 2s linear;
  height: 100%;
  width: 100%;
  padding: 120px 320px;
  justify-content: space-between;
  align-items: flex-end;
  overflow: hidden;
`;

export default function Contenders() {
  const [contenders, setContenders] = useState(["", ""]);
  
  const animationIn = () => {
    const c1 = document.getElementById("contender1");
    const c2 = document.getElementById("contender2");
    c1.style.transform = "translateX(0px)";
    c2.style.transform = "translateX(0px)";
  };
  const animationOut = () => {
    const c1 = document.getElementById("contender1");
    const c2 = document.getElementById("contender2");
    c1.style.transform = "translateX(-1000px)";
    c2.style.transform = "translateX(1000px)";
  };
  
  const startAnimation = () => {
    animationIn()
    setTimeout(animationOut, 4000)
  };
  
  const onMessage = msg => {
    setContenders(JSON.parse(msg));
    startAnimation();
  };

  useEffect(() => {
    socket = io("http://localhost:3000");
    socket.on("SHOW_PAIR", onMessage);
  }, []);

  const contender1 = contenders[0];
  const contender2 = contenders[1];

  return (
    <Wrapper>
      <Contender id="contender1" style={{ transform: "translateX(-1000px)" }}>
        {contender1}
      </Contender>
      <Contender id="contender2" style={{ transform: "translateX(1000px)" }}>{contender2}</Contender>
    </Wrapper>
  );
}
