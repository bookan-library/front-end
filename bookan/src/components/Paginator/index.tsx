import { Box, Button, Flex, List, ListItem } from '@chakra-ui/react'
import classnames from 'classnames'
import React from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { usePagination } from '../../hooks/usePagination'

interface Props {
    totalCount: number
    currentPage: number
    pageSize: number
    onPageChange: (num: number) => void
    siblingCount: number
}

export const Paginator = ({ totalCount, currentPage, pageSize, onPageChange, siblingCount }: Props) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // If there are less than 2 times in pagination range we shall not render the component
    // if (paginationRange)
    //     if (currentPage === 0 || paginationRange.length < 2) {
    //         return null;
    //     }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };
    let lastPage
    if (paginationRange)
        lastPage = paginationRange[paginationRange.length - 1];
    return (
        <List
            display={'flex'}
            alignItems={'center'}
        >
            {/* Left navigation arrow */}
            < ListItem
                cursor={'pointer'}
                onClick={onPrevious}
            >

                <IoIosArrowBack />
            </ListItem >
            {
                paginationRange && paginationRange.map(pageNumber => {

                    // If the pageItem is a DOT, render the DOTS unicode character
                    if (pageNumber === '.') {
                        return <li className="pagination-item dots">&#8230;</li>;
                    }

                    // Render our Page Pills
                    return (
                        <ListItem
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            border={'1px solid #d3d6db'}
                            padding={'15px'}
                            width={'20px'}
                            height={'20px'}
                            margin={'0 10px'}
                            borderRadius={'50%'}
                            cursor={'pointer'}
                            _hover={{
                                bg: '#ebedf0'
                            }
                            }
                            onClick={() => onPageChange(parseInt(pageNumber.toString()))}
                        >
                            {pageNumber}
                        </ListItem>
                    );
                })
            }
            {/*  Right Navigation arrow */}
            {

                lastPage !== currentPage &&
                <ListItem
                    onClick={onNext}
                    cursor={'pointer'}
                >
                    <IoIosArrowForward />
                </ListItem>
            }

        </List >
    );
}
