import React, { useState, useEffect, useContext } from 'react';
import { Router } from 'react-router-dom';
import styled from 'styled-components';
import Routes from './navigation/routes';
import GlobalStyle from './styles/global';
import { history } from './navigation/history';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Router history={history}>
        <Routes />
      </Router>
    </>
  );
}
