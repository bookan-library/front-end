import { SearchIcon } from '@chakra-ui/icons';
import { Divider, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
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
                        <BookCard book={book}></BookCard>
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
