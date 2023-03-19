import { Button } from '@chakra-ui/button';
import { Divider, Flex, Text } from '@chakra-ui/layout';
import { BsCartPlus } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Counter } from '../../components/Counter/counter';
import { Book } from '../../Model/Book';
import { useApplicationStore } from '../../stores/store';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { CommentForm } from '../../components/CommentForm/CommentForm';
import { Newsletter } from '../../components/Newsletter';
import { CommentBox } from '../../components/Comment/Comment';
import { LoginForm } from '../../components/Auth/Login';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { Roles } from '../../types/Roles';
import { displayToast } from '../../utils/toast';

export const DetailedBookView = () => {
    const params = useParams();
    const getBookById = useApplicationStore(state => state.getBookById)
    const book = useApplicationStore(state => state.books.data[0])
    const getComments = useApplicationStore(state => state.getCommentsForBook)
    const comments = useApplicationStore(state => state.comments)
    const addToWishlist = useApplicationStore(state => state.addToWishlist)
    const addToWishlistRes = useApplicationStore(state => state.addToWishlistRes)
    const loggedUser = useApplicationStore(state => state.loggedUser.data[0])
    const checkIfBookInWishlist = useApplicationStore(state => state.checkIfBookInWishlist)
    const isBookInWishlist = useApplicationStore(state => state.isBookInWishlist)
    const removeFromWishlist = useApplicationStore(state => state.removeFromWishlist)
    const removeFromWishlistRes = useApplicationStore(state => state.removeFromWishlistRes)
    const addToCart = useApplicationStore(state => state.addToCart)
    const addToCartRes = useApplicationStore(state => state.addToCartRes)

    useEffect(() => {
        getBookById(params.id ?? '')
        getComments(params.id ?? '')
        checkIfBookInWishlist(book.id)
    }, [])

    const [quantity, setQuantity] = useState<number>(1)

    const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
    const toast = useToast()
    const handleAddToWishlist = async () => {
        if (loggedUser === undefined || loggedUser.role !== Roles.BUYER) {
            onOpenLogin()
            return
        }
        await addToWishlist(book.id)
        await checkIfBookInWishlist(book.id)
        displayToast("Book successfully added to wishlist!", toast, addToWishlistRes.status)
    }

    const handleRemoveFromWishlist = async () => {
        if (loggedUser === undefined || loggedUser.role !== Roles.BUYER) {
            onOpenLogin()
            return
        }
        await removeFromWishlist(book.id)
        await checkIfBookInWishlist(book.id)
        displayToast("Book successfully removed from wishlist!", toast, removeFromWishlistRes.status)
    }

    const handleAddToCart = async () => {
        if (loggedUser === undefined || loggedUser.role !== Roles.BUYER) {
            onOpenLogin()
            return
        }
        console.log('quantity ', quantity)
        await addToCart(book.id, quantity)
        displayToast("Book successfully added to cart!", toast, addToCartRes.status)
    }

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
                        {book.price} RSD
                    </Text>
                    <Flex alignItems={'flex-end'} mt={'15px'} gap={'1em'}>
                        <Counter count={quantity} setCount={setQuantity} />
                        <Button
                            bg={'green'}
                            color={'#fff'}
                            gap='10px'
                            _hover={{
                                bg: 'lightgreen'
                            }}
                            onClick={handleAddToCart}
                        >
                            DODAJ U KORPU
                            <BsCartPlus color='#fff' fontSize={'20px'} />
                        </Button>
                    </Flex>
                    {
                        isBookInWishlist.data ?
                            <Flex alignItems={'center'} gap={'5px'} cursor={'pointer'} mt={'15px'} onClick={handleRemoveFromWishlist}>
                                <AiFillHeart fontSize={'18px'} color={'red'} />
                                <Text color={'red'}>Uklonite iz liste zelja</Text>
                            </Flex>
                            :
                            <Flex alignItems={'center'} gap={'5px'} cursor={'pointer'} mt={'15px'} onClick={handleAddToWishlist}>
                                <AiOutlineHeart fontSize={'18px'} />
                                <Text>Sacuvajte u listi zelja</Text>
                            </Flex>
                    }


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
            <LoginForm isOpen={isOpenLogin} onOpen={onOpenLogin} onClose={onCloseLogin}></LoginForm>
        </Flex>
    )
}
