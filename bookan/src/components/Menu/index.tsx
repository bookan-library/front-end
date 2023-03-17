import React, { useEffect } from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Flex,
    useColorModeValue,
    Box,
    IconButton,
    useBreakpointValue,
    Stack,
    useDisclosure
} from '@chakra-ui/react'

import { link } from 'fs'
import { DesktopNav } from './DesktopNav'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useApplicationStore } from '../../stores/store'

export const NavMenu = () => {

    const getLoggedUser = useApplicationStore(state => state.getLoggedUser)
    const loggedUser = useApplicationStore(state => state.loggedUser)
    const token = useApplicationStore(state => state.token)

    useEffect(() => {
        if (token !== null)
            getLoggedUser()
    }, [token])

    const { isOpen, onToggle } = useDisclosure();
    return (
        <Flex>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                width={'100%'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} w={'100%'}>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10} w={'100%'}>
                        <DesktopNav loggedUser={loggedUser.data[0]} />
                    </Flex>
                </Flex>

            </Flex>
        </Flex>

    )
}

