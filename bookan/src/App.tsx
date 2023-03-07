import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { AuthMenu } from './components/Auth';
import { NavMenu } from './components/Menu';
import { RegisterForm } from './components/Auth/Register';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <AuthMenu></AuthMenu>
        <NavMenu></NavMenu>
      </div>
    </ChakraProvider>
  );
}

export default App;
