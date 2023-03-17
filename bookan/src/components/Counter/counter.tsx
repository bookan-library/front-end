import { Button } from '@chakra-ui/button'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { Flex, Text } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { Input } from '@chakra-ui/input'

export const Counter = () => {
    const [count, setCount] = useState<number>(0)

    return (
        <Flex direction={'column'}>
            <Text>Kolicina:</Text>
            <Flex>
                <Button onClick={() => setCount(count - 1)}>
                    <AiOutlineMinus />
                </Button>
                <Input type='number' width={'55px'} value={count} fontSize={'16px'} onChange={(e) => setCount(parseInt(e.target.value))} />
                <Button onClick={() => setCount(count + 1)}>
                    <AiOutlinePlus />
                </Button>
            </Flex>
        </Flex>

    )
}
