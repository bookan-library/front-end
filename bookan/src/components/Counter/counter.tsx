import { Button } from '@chakra-ui/button'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { Flex, Text } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import { Input } from '@chakra-ui/input'

interface Props {
    count: number
    setCount: (val: any) => void
    flag?: boolean
}

export const Counter = ({ count, setCount, flag = false }: Props) => {
    const [countRes, setCountRes] = useState<number>(count)

    const handleChange = (val: number) => {
        if (val === 0) {
            setCountRes(1)
            setCount(1)
            return
        }
        setCountRes(val)
        setCount(val)
    }

    return (
        <Flex direction={'column'}>
            <Flex>
                <Button onClick={() => { flag === true ? handleChange(countRes - 1) : setCount(count - 1) }}>
                    <AiOutlineMinus />
                </Button>
                <Input type='number' width={'55px'} value={flag === true ? countRes : count} fontSize={'16px'} onChange={(e) => setCount(parseInt(e.target.value))} />
                <Button onClick={() => { flag === true ? handleChange(countRes + 1) : setCount(count + 1) }}>
                    <AiOutlinePlus />
                </Button>
            </Flex>
        </Flex >

    )
}
