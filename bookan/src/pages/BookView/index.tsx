import { SearchIcon } from '@chakra-ui/icons';
import { Divider, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { BookCard } from '../../components/Book/BookCard';
import { useApplicationStore } from '../../stores/store'

export const BookView = () => {
    const params = useParams();
    const getBooksByCategory = useApplicationStore(state => state.getBooksByCategory)
    const books = useApplicationStore(state => state.books)
    const searchBooks = useApplicationStore(state => state.searchBooks)
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        getBooksByCategory(params.category ?? '', 1)
    }, [])

    useEffect(() => {
        searchBooks(search, 1)
    }, [search])


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
        </>


    )
}
