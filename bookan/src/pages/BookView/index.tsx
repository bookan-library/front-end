import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BookCard } from '../../components/Book/BookCard';
import { Filters } from '../../components/Filters/Filters';
import { Newsletter } from '../../components/Newsletter';
import { Paginator } from '../../components/Paginator';
import { useApplicationStore } from '../../stores/store'
import { QueryParams } from '../../types/QueryParams';

export const BookView = () => {
    const params = useParams();
    const [queryParams] = useSearchParams();
    const getBooksByCategory = useApplicationStore(state => state.getBooksByCategory)
    const books = useApplicationStore(state => state.books)
    const searchBooks = useApplicationStore(state => state.searchBooks)
    const getBookCount = useApplicationStore(state => state.getBookCount)
    const bookCount = useApplicationStore(state => state.bookCount)
    const [search, setSearch] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [sliderValue, setSliderValue] = useState([0, 5000])
    const [selectedPublishers, setSelectedPublishers] = useState<string[]>([])
    const navigate = useNavigate()
    const location = useLocation()

    const parsePriceFromParams = () => {
        const minPrice = parseInt(queryParams.get('minPrice') ?? '0')
        const maxPrice = parseInt(queryParams.get('maxPrice') ?? '5000')
        const publishers = queryParams.getAll('Publishers')
        return { minPrice, maxPrice, publishers }
    }

    const init = () => {
        const { minPrice, maxPrice, publishers } = parsePriceFromParams()
        setSelectedPublishers(publishers)
        setSliderValue([minPrice, maxPrice])
    }

    const loadBooks = async (page: number = 1) => {
        const parameters = { minPrice: sliderValue[0], maxPrice: sliderValue[1], publishers: selectedPublishers }
        await getBooksByCategory(params.category ?? '', page, parameters)
        await getBookCount(params.category ?? '', parameters)
    }

    const updateUrlWithParams = () => {
        const publishersQuery = selectedPublishers?.map(pub => `Publishers=${pub}`).join('&')
        navigate(`${location.pathname}?minPrice=${sliderValue[0]}&maxPrice=${sliderValue[1]}&${publishersQuery}`)
    }

    const handlePublisherDeselected = (publisher: string) => {
        const newPublishers = selectedPublishers.filter(p => p != publisher)
        setSelectedPublishers(newPublishers)
    }

    const handlePublisherSelected = (publisher: string) => {
        setSelectedPublishers([...selectedPublishers, publisher])
    }

    const handlePageChanged = async (page: number) => {
        if (page <= 0) return
        const parameters = { minPrice: sliderValue[0], maxPrice: sliderValue[1], publishers: selectedPublishers }
        await getBooksByCategory(params.category ?? '', page, parameters)
        setCurrentPage(page)
    }

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        updateUrlWithParams()
        loadBooks()
    }, [sliderValue, selectedPublishers])

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
                <Filters
                    sliderValue={sliderValue}
                    sliderValueChanged={(val) => setSliderValue(val)}
                    publisherDeselected={handlePublisherDeselected}
                    publisherSelected={handlePublisherSelected}
                    selectedPublishers={selectedPublishers}
                />
                <Flex>
                    {
                        books?.data.map(book =>
                            <BookCard key={book.id} book={book} category={params.category ?? ''}>

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

                            </BookCard>
                        )
                    }
                </Flex>
            </Flex>
            <Flex justifyContent={'center'} padding='20px 0'>
                <Paginator totalCount={bookCount.data} currentPage={currentPage} pageSize={10} onPageChange={handlePageChanged} siblingCount={2}></Paginator>
            </Flex>
        </>


    )
}
