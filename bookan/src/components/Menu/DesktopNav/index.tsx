import { Box, Button, Flex, Link, Popover, PopoverContent, PopoverTrigger, Stack, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { DesktopSubNav, NavItem } from '../DesktopSubNav';
import { FiUserPlus } from "react-icons/fi";
import { User } from '../../../Model/User';
import { Roles } from '../../../types/Roles';
import { RegisterSellerForm } from '../../Auth/RegisterSeller';

export const DesktopNav = ({ loggedUser }: any) => {

    const NAV_ITEMS: Array<NavItem> = [
        {
            label: 'KATEGORIJE',
            children: [
                {
                    label: 'DOMACE KNJIGE',
                    children: [
                        {
                            label: 'DOMACE KNJIGE'
                        },
                    ]
                },
                {
                    label: 'ROMANI',
                    children: [
                        {
                            label: 'SAVREMENI ROMAN'
                        },
                        {
                            label: 'DOMACI AUTOR'
                        },
                        {
                            label: 'OPSTA KNJIZEVNOST'
                        },
                        {
                            label: 'KLASICI'
                        },
                        {
                            label: 'TRILERI I MISTERIJE'
                        },
                        {
                            label: 'BIOGRAFIJE'
                        },
                    ]
                },
                {
                    label: 'TINEJDZ I YA',
                    children: [
                        {
                            label: 'TINEJDZ I YA ROMANI'
                        },
                        {
                            label: 'TINEJDZ I YA PRIRUCNICI'
                        },
                    ]
                },
                {
                    label: 'OPSTA INTERESOVANJA',
                    children: [
                        {
                            label: 'POPULARNA PSIHOLOGIJA'
                        },
                        {
                            label: 'ZDRAVLJE, PORODICA I ZIVOTNI STIL'
                        },
                        {
                            label: 'STRIPOVI'
                        },
                        {
                            label: 'MANGE'
                        },
                        {
                            label: 'SPORT'
                        },
                    ]
                },
                {
                    label: 'JEZIK I KNJIZEVNOST',
                    children: [
                        {
                            label: 'FILOLOGIJA'
                        },
                        {
                            label: 'POEZIJA'
                        },
                        {
                            label: 'ESEJISTIKA'
                        },
                        {
                            label: 'ISTORIJA I TEORIJA KNJIZEVNOSTI'
                        },
                    ]
                },
                {
                    label: 'UMETNOST',
                    children: [
                        {
                            label: 'PRIMENJENA UMETNOST'
                        },
                        {
                            label: 'OPSTA UMETNOST'
                        },
                        {
                            label: 'MUZIKA'
                        },
                        {
                            label: 'POZORISTE'
                        },
                        {
                            label: 'FILM'
                        },
                    ]
                },
                {
                    label: 'STRUCNA LITERATURA',
                    children: [
                        {
                            label: 'DRUSTVENE NAUKE'
                        },
                        {
                            label: 'EKONOMIJA'
                        },
                        {
                            label: 'MATEMATIKA I TEHNICKE NAUKE'
                        },
                        {
                            label: 'PRIRODNE NAUKE'
                        },
                        {
                            label: 'POPULARNA NAUKA'
                        },
                    ]
                },
            ],
        },
        {
            label: 'AKCIJE',
        },
        {
            label: 'NOVA IZDANJA',
            href: '#',
        },
        {
            label: 'USKORO',
            href: '#',
        },
        {
            label: 'BOOKTOK HITOVI',
            href: '#',
        },
    ];

    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Stack direction={'row'} spacing={4} alignItems={'center'} justify={'space-between'} w={'100%'}>
            <Flex gap={'25px'}>
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
                <>
                    <Button gap={'10px'} onClick={onOpen}>
                        <FiUserPlus></FiUserPlus>
                        REGISTRUJ PRODAVCA
                    </Button>
                    <RegisterSellerForm onOpen={onOpen} onClose={onClose} isOpen={isOpen}></RegisterSellerForm>
                </>

            }
        </Stack>
    )
}
