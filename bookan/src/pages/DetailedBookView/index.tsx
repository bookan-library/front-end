import { Button } from '@chakra-ui/button';
import { Divider, Flex, Text } from '@chakra-ui/layout';
import { BsCartPlus } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'

import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { Counter } from '../../components/Counter/counter';
import { Book } from '../../Model/Book';
import { useApplicationStore } from '../../stores/store';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { CommentForm } from '../../components/CommentForm/CommentForm';
import { Newsletter } from '../../components/Newsletter';
import { CommentBox } from '../../components/Comment/Comment';

export const DetailedBookView = () => {
    const params = useParams();
    const getBookById = useApplicationStore(state => state.getBookById)
    const book = useApplicationStore(state => state.books.data[0])
    const getComments = useApplicationStore(state => state.getCommentsForBook)
    const comments = useApplicationStore(state => state.comments)

    useEffect(() => {
        getBookById(params.id ?? '')
        getComments(params.id ?? '')
        console.log('comments ', comments)
    }, [])

    return (
        <Flex width={'100%'} direction={'column'} alignItems={'center'} pt={'3em'} gap={'40px'}>
            <Flex width={'100%'} gap={'15%'} justifyContent={'center'}>
                <Flex height={'400px'} justifyContent={'center'}>
                    <img src={book.picUrl} />
                </Flex>
                <Flex direction={'column'}>
                    <Text
                        fontSize={'30px'}
                    >
                        {book.name.toUpperCase()}
                    </Text>
                    <Text
                        color={'darkgray'}
                        mt={'10px'}
                    >
                        {book?.category?.name}
                    </Text>
                    <Text
                        color={'gray'}
                        mt={'15px'}
                    >
                        Autor: {book?.author?.firstName + ' ' + book.author.lastName}
                    </Text>
                    <Text
                        color={'gray'}
                        mt={'5px'}
                    >
                        Izdavac: {book?.publisher?.name}
                    </Text>
                    <Text
                        color={'gray'}
                        mt={'10px'}
                    >
                        {book.description}
                    </Text>
                    <Divider padding={'10px 0'} />
                    <Text
                        color={'red'}
                        fontSize={'24px'}
                        mt={'15px'}
                    >
                        Cena: 100 RSD
                    </Text>
                    <Flex alignItems={'flex-end'} mt={'15px'} gap={'1em'}>
                        <Counter />
                        <Button
                            bg={'green'}
                            color={'#fff'}
                            gap='10px'
                            _hover={{
                                bg: 'lightgreen'
                            }}
                        >
                            DODAJ U KORPU
                            <BsCartPlus color='#fff' fontSize={'20px'} />
                        </Button>
                    </Flex>
                    <Flex alignItems={'center'} gap={'5px'} cursor={'pointer'} mt={'15px'}>
                        <AiOutlineHeart fontSize={'18px'} />
                        Sacuvajte u listi zelja
                    </Flex>

                </Flex>
            </Flex>
            <Flex width={'100%'} justifyContent='center'>
                <Tabs variant='enclosed' width={'70%'} display={'flex'} flexDirection={'column'} justifyContent='center'>
                    <TabList justifyContent={'center'}>
                        <Tab>O PROIZVODU</Tab>
                        <Tab>SPECIFIKACIJA</Tab>
                        <Tab>KOMENTARI</Tab>
                    </TabList>
                    <TabPanels display={'flex'} justifyContent={'center'} width={'100%'}>
                        <TabPanel>
                            <Text>{book.description}</Text>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel width={'80%'}>
                            <CommentForm book={book} />
                            <Text mt={'20px'} fontSize={'18px'} ml={'10px'} color={'gray'}>OSTALI KOMENTARI</Text>
                            <Divider />
                            {
                                comments.data.map(comment =>
                                    <CommentBox comment={comment}></CommentBox>
                                )
                            }
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
            <Newsletter></Newsletter>
        </Flex>
    )
}
