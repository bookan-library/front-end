import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApplicationStore } from '../../stores/store'
import { ResponseStatus } from '../../stores/types'

export const VerificationPage = () => {

    const verifyUser = useApplicationStore(state => state.verifyUser)
    const verifiedUser = useApplicationStore(state => state.verifiedUser)
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const id = searchParams.get('id');
    const navigate = useNavigate()

    useEffect(() => {
        verifyUser(id, code)
        if (verifiedUser.status === ResponseStatus.Success)
            navigate('/')
    }, [])

    return (
        <Flex w={'100%'} h={'100vh'} justify={'center'} alignItems={'center'}>
            <Flex direction={'column'} alignItems={'center'} w={'500px'} border={'1px solid orange'} borderRadius={'15px'} p={'25px'}>
                <Text fontSize={'lg'} fontWeight={'600'} width={'500px'} textAlign={'center'} p={'10px'}>
                    Verifying...
                </Text>
                <img src="verification.jpg" alt="verification image" />
            </Flex>
        </Flex >
    )
}