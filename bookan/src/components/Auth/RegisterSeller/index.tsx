import { Button, Flex, FormControl, Input, Modal, ModalCloseButton, ModalContent, ModalOverlay, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useApplicationStore } from '../../../stores/store'
import { RegisterSeller } from '../../../types/RegisterSeller'
import { displayToast } from '../../../utils/toast'

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

export const RegisterSellerForm = ({ isOpen, onOpen, onClose }: Props) => {


    const registerSeller = useApplicationStore(state => state.registerSeller)
    const registerSellerDetails = useApplicationStore(state => state.registerSellerDetails)
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const toast = useToast()
    const onSubmit: SubmitHandler<Inputs> = async data => {
        await registerSeller(data as unknown as RegisterSeller);
        if (registerSellerDetails.error === null)
            onClose()
        displayToast("Seller successfully registered!", toast, registerSellerDetails.status)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent css={
                {
                    position: 'absolute',
                    backgroundColor: '#fff',
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                    width: '500px',
                    padding: '2em',
                    flexDirection: 'column',
                    alignItems: 'center',
                }
            }>
                <ModalCloseButton />
                <Text fontSize="2xl" marginBottom={'20px'}>Registrujte prodavca!</Text>
                <FormControl css={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px'
                    }
                }>
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
                <Button width={'70%'} backgroundColor={'#000'} color='#fff' marginTop={'20px'} _hover={{ backgroundColor: '#ff6600' }} onClick={handleSubmit(onSubmit)}>Registruj prodavca</Button>
            </ModalContent>
        </Modal >
    )
}
