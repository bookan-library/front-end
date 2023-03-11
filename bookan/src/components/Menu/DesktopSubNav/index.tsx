import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Link, Popover, PopoverContent, PopoverTrigger, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react'

export interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}


export const DesktopSubNav = ({ label, href, subLabel, children }: NavItem) => {
    return (
        <>
            <Popover trigger={'hover'} placement={'bottom-start'} size={'md'}>
                <PopoverTrigger>
                    <Link
                        href={href}
                        role={'group'}
                        display={'block'}
                        p={2}
                        rounded={'md'}
                        _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
                        <Stack direction={'row'} align={'center'}>
                            <Box>
                                <Text
                                    transition={'all .3s ease'}
                                    fontSize={'xs'}
                                    _groupHover={{ color: 'pink.400' }}
                                    fontWeight={500}>
                                    {label}
                                </Text>
                            </Box>
                            <Flex
                                transition={'all .3s ease'}
                                transform={'translateX(-10px)'}
                                opacity={0}
                                _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                                justify={'flex-end'}
                                align={'center'}
                                flex={1}>
                                <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                            </Flex>
                        </Stack>
                    </Link>

                </PopoverTrigger>


                <PopoverContent
                    border={0}
                    boxShadow={'xl'}
                    // bg={popoverContentBgColor}
                    p={4}
                    rounded={'xl'}
                    ml={'250px'}
                    mt={'-60px'}
                    css={
                        {
                            maxWidth: '240px',
                            minWidth: '190px'
                        }
                    }
                >
                    {children && children?.map((child =>
                        <Link
                            key={child.label}
                            href={href}
                            role={'group'}
                            display={'block'}
                            p={2}
                            rounded={'md'}
                            _hover={{ textDecoration: 'none' }}
                            css={
                                {
                                    maxWidth: '190px',
                                    minWidth: '190px'
                                }
                            }
                        // textUnderline={'none'}
                        >
                            <Stack direction={'row'} align={'center'}>
                                <Box>
                                    <Text
                                        transition={'all .3s ease'}
                                        _groupHover={{ color: 'pink.400' }}
                                        fontWeight={500}
                                        fontSize={'xs'}
                                    >
                                        {child.label}
                                    </Text>
                                </Box>
                            </Stack>
                        </Link>
                    ))}

                </PopoverContent>
            </Popover>

        </>

    )
}
