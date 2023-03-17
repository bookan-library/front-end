import { Box, Button, Flex, Link, useDisclosure, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useApplicationStore } from '../../stores/store'
import { Roles } from '../../types/Roles'
import styles from './index.module.css'
import { LoginForm } from './Login'
import { RegisterForm } from './Register'

export const AuthMenu = () => {
    const { isOpen: isOpenRegister, onOpen: onOpenRegister, onClose: onCloseRegister } = useDisclosure();
    const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
    const token = useApplicationStore(state => state.token)
    const logout = useApplicationStore(state => state.logout)
    const loggedUser = useApplicationStore(state => state.loggedUser.data[0])
    const getLoggedUser = useApplicationStore(state => state.getLoggedUser)
    const navigate = useNavigate()
    const handleFavoriteBooks = () => {
        getLoggedUser()
        if (loggedUser === undefined || loggedUser.role !== Roles.BUYER) {
            onOpenLogin()
            return
        }
        navigate('/user/favorite')
    }

    return (
        <Flex width={'100%'}>
            <Flex css={
                {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: '#000',
                    padding: '.5em 1em',
                    gap: '20px'
                }
            }
                width={'100%'}
            >
                {
                    token !== null ?
                        <>
                            <Text color='white'>{loggedUser.firstName} {loggedUser.lastName}</Text>
                            <Link color='white' onClick={() => {
                                logout()
                                navigate('/')
                            }}
                            >Odjavite se
                            </Link>
                        </>

                        :
                        <>
                            <Link color='white' onClick={onOpenLogin}>
                                Prijavite se
                            </Link>
                            <Link color='white' onClick={onOpenRegister}>
                                Registrujte se
                            </Link>
                        </>
                }
                <Box onClick={handleFavoriteBooks} cursor={'pointer'}>
                    <AiOutlineHeart fontSize={'18px'} color={'#fff'} />
                </Box>

            </Flex>
            <RegisterForm isOpen={isOpenRegister} onOpen={onOpenRegister} onClose={onCloseRegister}></RegisterForm>
            <LoginForm isOpen={isOpenLogin} onOpen={onOpenLogin} onClose={onCloseLogin}></LoginForm>
        </Flex >

    )
}
