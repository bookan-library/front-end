import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Box,
  ChakraProvider,
  Divider,
  extendTheme,
  Flex,
  Img,
  Text,
} from "@chakra-ui/react";
import { FiTruck } from "react-icons/fi";
import { BsPercent } from "react-icons/bs";
import { AuthMenu } from "./components/Auth";
import { NavMenu } from "./components/Menu";
import { RegisterForm } from "./components/Auth/Register";
// import Pages from './Routing';
import { Outlet } from "react-router-dom";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Flex className="App" minHeight={"100vh"} direction={"column"}>
      <Box minHeight={"10vh"}>
        <AuthMenu></AuthMenu>
        <ToastContainer />

        <Flex bg={"#fff"} padding={"30px"} justifyContent={"center"}>
          <Flex gap={"15px"} alignItems={"center"}>
            <Img src="/logo.png" width={"200px"}></Img>
            <Divider orientation="vertical" />
            <Flex color={"gray"} fontWeight={"500"} gap={"10px"}>
              <FiTruck color="red" fontSize={25}></FiTruck>
              <Text>BESPLATNA DOSTAVA</Text>
            </Flex>
            <Divider orientation="vertical" />
            <Flex color={"gray"} gap={"10px"} alignItems="center">
              <BsPercent color="red" fontSize={25}></BsPercent>
              <Box>
                <Text fontWeight={"500"}>KOLICINSKI POPUST</Text>
                <Text>Dodatnih 10% na 3 i vise kupljenih artikala</Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Divider></Divider>
        <NavMenu></NavMenu>
      </Box>
      <Outlet />
      <Newsletter></Newsletter>
      <Footer></Footer>
    </Flex>
  );
}

export default App;
