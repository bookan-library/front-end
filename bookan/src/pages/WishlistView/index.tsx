import { Box, Button, Divider, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Paginator } from '../../components/Paginator'
import { useApplicationStore } from '../../stores/store'
import { FaUser } from 'react-icons/fa'
import { BookCard } from '../../components/Book/BookCard'
import { useNavigate } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { displayToast } from '../../utils/toast'

export const WishlistView = () => {

    const getWishlist = useApplicationStore(state => state.getWishlist)
    const wishlist = useApplicationStore(state => state.wishlist)
    const getWishlistCount = useApplicationStore(state => state.getWishlistCount)
    const wishlistCount = useApplicationStore(state => state.wishlistCount)
    const loggedUser = useApplicationStore(state => state.loggedUser)
    const removeFromWishlist = useApplicationStore(state => state.removeFromWishlist)
    const removeFromWishlistRes = useApplicationStore(state => state.removeFromWishlistRes)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [display, setDisplay] = useState<boolean>(false)
    const navigate = useNavigate()
    const toast = useToast()

    useEffect(() => {
        getWishlist(currentPage)
        getWishlistCount()
        console.log('count ', wishlist)
    }, [])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleRemoveFromWishlist = async (bookId: number) => {
        // if (loggedUser === undefined || loggedUser.role !== Roles.BUYER) {
        //     onOpenLogin()
        //     return
        // }
        await removeFromWishlist(bookId)
        displayToast("Book successfully removed from wishlist!", toast, removeFromWishlistRes.status)
        getWishlist(currentPage)
    }

    return (
        <Flex width={'100%'} direction={'column'} alignItems={'center'}>
            <Flex width={'70%'} justifyContent={'space-between'} alignItems={'center'} padding='15px'>
                <Flex gap={'10px'}>
                    <FaUser fontSize={'30px'}></FaUser>
                    <Text
                        fontSize={'20px'}
                        fontWeight={'500'}
                    >
                        {loggedUser.data[0].firstName} {loggedUser.data[0].lastName}
                    </Text>
                </Flex>
                <Box color={'gray'}>
                    <Text>Email adresa</Text>
                    <Text>{loggedUser.data[0].email} </Text>
                </Box>
                <Box color={'gray'}>
                    <Text>Adresa</Text>
                    <Text>{loggedUser.data[0].address.street} {loggedUser.data[0].address.streetNumber}, {loggedUser.data[0].address.city}</Text>
                </Box>
            </Flex>
            <Divider width={'80%'}></Divider>
            <Box width={'70%'} padding={'15px'}>
                <Text fontSize={'20px'} fontWeight={'500'}>OMILJENI PROIZVODI</Text>
                <Text color={'gray'}>{loggedUser.data[0].firstName}, ovo je vasa lista</Text>
            </Box>
            <Flex width={'70%'} padding={'10px'}>
                {
                    wishlist?.data.map((wish: any) =>
                        <BookCard book={wish.book} category={wish.book.category.name ?? ''} setDisplay={setDisplay}>
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
                                {/* <Button
                                    bg={'#000'}
                                    color={'#fff'}
                                    width={'130px'}
                                    _hover={
                                        {
                                            bg: 'button.hover'
                                        }
                                    }
                                    onClick={() => navigate(`/books/categories/${params.category ?? ''}/${book.id}`)}
                                >
                                    DETALJNIJE
                                </Button> */}
                                <Button onClick={() => handleRemoveFromWishlist(wish.book.id)}>
                                    <AiOutlineClose color='#000' fontSize={'20px'}></AiOutlineClose>
                                </Button>
                            </Box>
                        </BookCard>
                    )
                }
            </Flex>
            <Paginator totalCount={wishlistCount.data as unknown as number} currentPage={currentPage} pageSize={1} onPageChange={handlePageChange} siblingCount={2}></Paginator>
        </Flex >
    )
}
