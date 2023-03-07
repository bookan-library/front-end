import { background, Button, Center, Flex, FormControl, FormHelperText, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
import styles from './index.module.css'
import { useForm, SubmitHandler } from "react-hook-form";
import { useApplicationStore } from '../../../stores/store';
import { RegisterBuyer } from '../../../types/RegisterBuyer';


interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

type Inputs = {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    street: string
    number: string
    city: string
    postalCode: string
    country: string
    password: string
    confirmPassword: string
}

export const RegisterForm = ({ isOpen, onOpen, onClose }: Props) => {

    const registerBuyer = useApplicationStore(state => state.registerBuyer)
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => registerBuyer(data as unknown as RegisterBuyer);



    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className={styles.formWrapper}>
                <ModalCloseButton />
                <Text fontSize="2xl" marginBottom={'20px'}>Register!</Text>
                <FormControl className={styles.form}>
                    <Input type='text' width={'75%'} placeholder='First name' {...register("firstName", { required: true })} />
                    <Input type='text' width={'75%'} placeholder='Last name' {...register("lastName", { required: true })} />
                    <Input type='text' width={'75%'} placeholder='Email' {...register("email", { required: true })} />
                    <Input type='text' width={'75%'} placeholder='Phone number' {...register("phoneNumber", { required: true })} />
                    <Flex justify={'center'} gap={'5%'}>
                        <Input type='text' width={'45%'} placeholder='Street' {...register("street", { required: true })} />
                        <Input type='text' width={'25%'} placeholder='Number' {...register("number", { required: true })} />
                    </Flex>
                    <Flex justify={'center'} gap={'5%'}>
                        <Input type='text' width={'40%'} placeholder='City' {...register("city", { required: true })} />
                        <Input type='text' width={'30%'} placeholder='Postal code' {...register("postalCode", { required: true })} />
                    </Flex>
                    <Input type='text' width={'75%'} placeholder='Country' {...register("country", { required: true })} />
                    <Input type='password' width={'75%'} placeholder='Password' {...register("password", { required: true })} />
                    <Input type='password' width={'75%'} placeholder='Confirm password' {...register("confirmPassword", { required: true })} />
                </FormControl>
                <Button width={'70%'} backgroundColor={'#000'} color='#fff' marginTop={'20px'} _hover={{ backgroundColor: '#ff6600' }} onClick={handleSubmit(onSubmit)}>Register</Button>
            </ModalContent>
        </Modal >

    )
}
