import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Book } from '../../../Model/Book'

interface Props {
    book: Book
}

export const BookCard = ({ book }: Props) => {

    const [display, setDisplay] = useState<boolean>(false)

    return (
        <Box
            width={'200px'}
            position={'relative'}
            cursor={'pointer'}
            onMouseOver={() => setDisplay(true)}
            onMouseOut={() => setDisplay(false)}
        >
            <Flex
                width={'100%'}
                direction={'column'}
                alignItems={'center'}
            >
                <Flex
                    width={'100%'}
                    height={'70%'}
                    justifyContent={'center'}
                >
                    <Image
                        width={'170px'}
                        height={'250px'}
                        src={book.picUrl} alt="" />
                </Flex>
                <Flex
                    direction={'column'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    gap={'.5em'}
                    pt={'.5em'}
                >
                    <Text>{book.name}</Text>
                    <Text>{book.author.firstName}</Text>
                    <Text>100 RSD</Text>
                </Flex>


            </Flex>
            <Box
                width={'100%'}
                height={'100%'}
                bg={'rgba(0, 0, 0, .2)'}
                display={display ? 'flex' : 'none'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={'1.5em'}
                position={'absolute'}
                top={'0'}
                left={'0'}
                zIndex={'100'}
            >
                <Button
                    bg={'#000'}
                    color={'#fff'}
                    width={'130px'}
                    _hover={
                        {
                            bg: 'button.hover'
                        }
                    }
                >
                    DETALJNIJE
                </Button>
                <Button
                    bg={'#000'}
                    color={'#fff'}
                    width={'130px'}
                    _hover={
                        {
                            bg: 'button.hover'
                        }
                    }
                >
                    BRZI PREGLED
                </Button>
            </Box>
        </Box >
    )
}
