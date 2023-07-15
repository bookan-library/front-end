import {
  Button,
  Flex,
  Input,
  Text,
  Image,
  useToast,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFillSendFill } from "react-icons/bs";
import { Form } from "react-router-dom";
import { newsletterSchema } from "../../schemas/newsletterSchema";
import { useApplicationStore } from "../../stores/store";
import { ResponseStatus } from "../../stores/types";

interface Inputs {
  email: string;
}

export const Newsletter = () => {
  const subscribeToNewsletter = useApplicationStore(
    (state) => state.subscribeToNewsletter
  );
  const subscription = useApplicationStore((state) => state.subscription);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(newsletterSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    subscribeToNewsletter(data.email);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        email: "",
      });
    }
  }, [formState, reset]);

  return (
    <Flex
      mt={"auto"}
      height={"250px"}
      width={"100%"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"1em"}
      position={"relative"}
    >
      <Image
        src={"/newsletter-background2.jpg"}
        width={"100%"}
        height={"100%"}
        position={"absolute"}
        zIndex={"1"}
      />
      <Text fontSize={"30px"} fontWeight={"700"} zIndex={"5"}>
        NEWSLETTER
      </Text>

      <Flex zIndex={"5"} width={"70%"} justifyContent={"center"}>
        <Form>
          <Flex>
            <FormControl isInvalid={errors.email != null}>
              <Input
                type="email"
                bg={"#fff"}
                width={"350px"}
                placeholder={"email@example.com"}
                {...register("email")}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>
            <Button
              bg={"red"}
              color={"#fff"}
              gap={"10px"}
              _hover={{ bg: "#000" }}
              onClick={handleSubmit(onSubmit)}
            >
              PRIJAVITE SE
              <BsFillSendFill color="#fff" />
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
};
