import { Flex, Img, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Text, Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartItemBox } from '../../components/CartItem/CartItem'
import { Counter } from '../../components/Counter/counter'
import { Newsletter } from '../../components/Newsletter'
import { CartItem } from '../../Model/CartItem'
import { useApplicationStore } from '../../stores/store'

export const CartView = () => {

    const getLoggedUser = useApplicationStore(state => state.getLoggedUser)
    const loggedUser = useApplicationStore(state => state.loggedUser)
    const getUserCart = useApplicationStore(state => state.getUserCart)
    let cart = useApplicationStore(state => state.cart)

    const [finalPrice, setFinalPrice] = useState<number>(0)

    useEffect(() => {
        getLoggedUser()
        getUserCart()
        calculateFinalPrice()
    }, [])


    const calculateFinalPrice = () => {
        getUserCart()
        let finalPrice = 0
        cart.data.forEach((cartItem: CartItem) => {
            finalPrice += cartItem.book.price * cartItem.quantity
        })
        setFinalPrice(finalPrice)
    }

    return (

        <Flex minHeight={'90vh'} direction={'column'}>
            <TableContainer mt={'20px'}>
                <Table variant='striped'>
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th>Proizvod</Th>
                            <Th>Cena</Th>
                            <Th>Kolicina</Th>
                            <Th>Ukupno</Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        {
                            cart && cart?.data?.map((cartItem: CartItem) =>
                                <CartItemBox cartItem={cartItem} calculateFinalPrice={calculateFinalPrice}></CartItemBox>
                            )
                        }
                    </Tbody>
                </Table>
                <Flex justifyContent={'flex-end'} pr={'150px'}>
                    <Text fontWeight={'600'} color={'gray'} fontSize={'20px'}>UKUPNO {finalPrice} RSD</Text>
                </Flex>
            </TableContainer >
        </Flex>
    )
}
