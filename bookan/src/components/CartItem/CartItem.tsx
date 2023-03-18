import { Button, Flex, Img, Td, Tr, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartItem } from '../../Model/CartItem'
import { useApplicationStore } from '../../stores/store'
import { Counter } from '../Counter/counter'

interface Props {
    cartItem: CartItem
    calculateFinalPrice: () => void
}

export const CartItemBox = ({ cartItem, calculateFinalPrice }: Props) => {
    const removeFromCart = useApplicationStore(state => state.removeFromCart)
    const updateInCart = useApplicationStore(state => state.updateInCart)
    const getUserCart = useApplicationStore(state => state.getUserCart)
    const navigate = useNavigate()
    const [currentQuantity, setCurrentQuantity] = useState<number>(cartItem.quantity)

    return (
        <Tr cursor={'pointer'}>
            <Td onClick={() => navigate(`/books/categories/${cartItem.book.category.name}/${cartItem.book.id}`)}>
                <Img src={cartItem.book.picUrl} height={'120px'} ml={'30px'} />
            </Td>
            <Td onClick={() => navigate(`/books/categories/${cartItem.book.category.name}/${cartItem.book.id}`)}>
                <Flex>
                    <Flex direction={'column'} gap={'7px'}>
                        <Text fontSize={'16px'} color={'#1b1c1c'}>{cartItem.book.category.name}</Text>
                        <Text fontSize={'18px'}>{cartItem.book.name.toUpperCase()}</Text>
                        <Text color={'gray'}>{cartItem.book.author.firstName} {cartItem.book.author.lastName}</Text>
                    </Flex>
                </Flex>
            </Td>
            <Td onClick={() => navigate(`/books/categories/${cartItem.book.category.name}/${cartItem.book.id}`)}>{cartItem.book.price} RSD</Td>
            <Td>
                <Counter count={cartItem.quantity} flag={true} setCount={(value: number) => { setCurrentQuantity(value); updateInCart(value, cartItem.book.id); calculateFinalPrice() }}></Counter>
            </Td>
            <Td onClick={() => navigate(`/books/categories/${cartItem.book.category.name}/${cartItem.book.id}`)}>
                <Text>{cartItem.book.price * currentQuantity} RSD</Text>
            </Td>
            <Td>
                <Button onClick={() => { removeFromCart(cartItem.id); getUserCart() }}>IZBRISITE</Button>
            </Td>
        </Tr>
    )
}
