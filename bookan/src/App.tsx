import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AuthMenu } from './components/Auth';
import { NavMenu } from './components/Menu';
import { RegisterForm } from './components/Auth/Register';
// import Pages from './Routing';
import { Outlet } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <AuthMenu></AuthMenu>
      <NavMenu></NavMenu>
      <Outlet />
    </div>
  );
}

export default App;
