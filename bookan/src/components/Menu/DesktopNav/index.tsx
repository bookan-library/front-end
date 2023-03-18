import { Box, Button, Flex, Link, Popover, PopoverContent, PopoverTrigger, Stack, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { DesktopSubNav, NavItem } from '../DesktopSubNav';
import { FiUserPlus } from "react-icons/fi";
import { BiBookAdd } from "react-icons/bi";
import { ImHome } from 'react-icons/im'
import { BiCommentCheck } from 'react-icons/bi'
import { Roles } from '../../../types/Roles';
import { RegisterSellerForm } from '../../Auth/RegisterSeller';
import { AddBookForm } from '../../Book/AddBookForm';
import { useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from './consts';

export const DesktopNav = ({ loggedUser }: any) => {

    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenBook, onOpen: onOpenBook, onClose: onCloseBook } = useDisclosure();
    const navigate = useNavigate()

    return (
        <Stack direction={'row'} spacing={4} alignItems={'center'} justify={'space-between'} w={'100%'}>
            <Flex gap={'25px'}>
                <ImHome fontSize={'25px'}></ImHome>
                {NAV_ITEMS.map((navItem) => (
                    <Box key={navItem.label}>
                        <Popover trigger={'hover'} placement={'bottom-start'} size={'20px'}>
                            <PopoverTrigger>
                                <Link
                                    p={2}
                                    href={navItem.href ?? '#'}
                                    fontSize={'sm'}
                                    fontWeight={500}
                                    color={linkColor}
                                    _hover={{
                                        textDecoration: 'none',
                                        color: linkHoverColor,
                                    }}>
                                    {navItem.label}
                                </Link>
                            </PopoverTrigger>

                            {navItem.children && (
                                <PopoverContent
                                    border={0}
                                    boxShadow={'xl'}
                                    bg={popoverContentBgColor}
                                    p={4}
                                    rounded={'xl'}
                                    minW={'sm'}
                                    css={
                                        {
                                            maxWidth: '270px',
                                            minWidth: '220px'
                                        }
                                    }
                                >
                                    <Stack>
                                        {navItem.children.map((child) => (
                                            <DesktopSubNav key={child.label} {...child} />
                                        ))}
                                    </Stack>
                                </PopoverContent>
                            )}
                        </Popover>
                    </Box>
                ))}
            </Flex>
            {
                loggedUser !== undefined && loggedUser.role == Roles.MANAGER &&
                <Flex gap={'15px'}>
                    <Button gap={'10px'} onClick={() => { navigate('/comments/approvement') }}>
                        <BiCommentCheck></BiCommentCheck>
                        PREGLED KOMENTARA
                    </Button>
                    <Button gap={'10px'} onClick={onOpen}>
                        <FiUserPlus></FiUserPlus>
                        REGISTRUJ PRODAVCA
                    </Button>
                    <RegisterSellerForm onOpen={onOpen} onClose={onClose} isOpen={isOpen}></RegisterSellerForm>
                </Flex>

            }
            {
                loggedUser !== undefined && loggedUser.role == Roles.SELLER &&
                <>
                    <Button gap={'10px'} onClick={onOpenBook}>
                        <BiBookAdd></BiBookAdd>
                        DODAJ KNJIGU
                    </Button>
                    <AddBookForm onOpen={onOpenBook} onClose={onCloseBook} isOpen={isOpenBook}></AddBookForm>
                </>
            }
        </Stack>
    )
}
