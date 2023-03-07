import { Button, Flex, Link, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import styles from './index.module.css'
import { RegisterForm } from './Register'

export const AuthMenu = () => {
    const [openRegister, setOpenRegister] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Flex className={styles.authWrapper}>
                <Link color='white'>
                    Login
                </Link>
                <Link color='white' onClick={onOpen}>
                    Register
                </Link>
            </Flex>
            <RegisterForm isOpen={isOpen} onOpen={onOpen} onClose={onClose}></RegisterForm>
        </>

    )
}
