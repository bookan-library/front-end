import { Button, Flex, Link, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApplicationStore } from '../../stores/store'
import styles from './index.module.css'
import { LoginForm } from './Login'
import { RegisterForm } from './Register'

export const AuthMenu = () => {
    const { isOpen: isOpenRegister, onOpen: onOpenRegister, onClose: onCloseRegister } = useDisclosure();
    const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
    const token = useApplicationStore(state => state.token)
    const logout = useApplicationStore(state => state.logout)
    const navigate = useNavigate()

    return (
        <>
            <Flex className={styles.authWrapper}>
                {
                    token !== null ?
                        <Link color='white' onClick={() => {
                            logout()
                            navigate('/')
                        }

                        }
                        >Odjavite se</Link>
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

            </Flex>
            <RegisterForm isOpen={isOpenRegister} onOpen={onOpenRegister} onClose={onCloseRegister}></RegisterForm>
            <LoginForm isOpen={isOpenLogin} onOpen={onOpenLogin} onClose={onCloseLogin}></LoginForm>
        </>

    )
}
