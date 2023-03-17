import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BookCard } from '../../components/Book/BookCard';
import { Newsletter } from '../../components/Newsletter';
import { Paginator } from '../../components/Paginator';
import { useApplicationStore } from '../../stores/store'

export const BookView = () => {
    const params = useParams();
    const getBooksByCategory = useApplicationStore(state => state.getBooksByCategory)
    const books = useApplicationStore(state => state.books)
    const searchBooks = useApplicationStore(state => state.searchBooks)
    const getBookCount = useApplicationStore(state => state.getBookCount)
    const bookCount = useApplicationStore(state => state.bookCount)
    const [search, setSearch] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [display, setDisplay] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        getBooksByCategory(params.category ?? '', currentPage)
        getBookCount()
    }, [])

    useEffect(() => {
        getBooksByCategory(params.category ?? '', currentPage)
    }, [currentPage])

    useEffect(() => {
        searchBooks(search, 1)
    }, [search])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <>
            <Flex justifyContent={'space-between'} m={'15px 30px'}>
                <Text fontSize={'2xl'}>{params.category}</Text>
                <InputGroup width={'20%'}>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='gray.300' />}
                    />
                    <Input type='text' placeholder='Search books' value={search} onChange={(e) => setSearch(e.target.value)} />
                </InputGroup>
            </Flex>
            <Divider></Divider>

            <Flex
                mt={'2.5em'}
                gap={'15px'}
            >
                {
                    books?.data.map(book =>
                        <BookCard book={book} category={params.category ?? ''} setDisplay={setDisplay}>
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
                                    onClick={() => navigate(`/books/categories/${params.category ?? ''}/${book.id}`)}
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
                        </BookCard>
                    )
                }
            </Flex>
            <Flex justifyContent={'center'} padding='20px 0'>
                <Paginator totalCount={bookCount.data} currentPage={currentPage} pageSize={1} onPageChange={handlePageChange} siblingCount={2}></Paginator>
            </Flex>
            <Newsletter></Newsletter>
        </>


    )
}
