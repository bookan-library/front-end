import { Button, Flex, FormControl, Input, Modal, ModalCloseButton, ModalContent, ModalOverlay, Text } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useApplicationStore } from "../../../stores/store"
import { LoginCredentials } from "../../../types/LoginCredentials"

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

type Inputs = {
    email: string
    password: string
}

export const LoginForm = ({ isOpen, onOpen, onClose }: Props) => {

    const login = useApplicationStore(state => state.login)
    const token = useApplicationStore(state => state.token)
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        login(data as unknown as LoginCredentials);
        if (token === null) {
            onClose()
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                css={
                    {
                        position: 'absolute',
                        backgroundColor: '#fff',
                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                        width: '500px',
                        padding: '2em',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }
                }
            >
                <ModalCloseButton />
                <Text fontSize="2xl" marginBottom={'20px'}>Prijavite se!</Text>
                <FormControl
                    css={
                        {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px'
                        }
                    }
                >
                    <Input type='text' width={'75%'} placeholder='Email' {...register("email", { required: true })} />
                    <Input type='password' width={'75%'} placeholder='Password' {...register("password", { required: true })} />
                </FormControl>
                <Button width={'70%'} backgroundColor={'#000'} color='#fff' marginTop={'20px'} _hover={{ backgroundColor: '#ff6600' }} onClick={handleSubmit(onSubmit)}>Prijavi se</Button>
            </ModalContent>
        </Modal >

    )
}
