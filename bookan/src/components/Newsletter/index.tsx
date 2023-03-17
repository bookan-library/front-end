import { Button, Flex, Input, Text, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import { Form } from 'react-router-dom'
import { useApplicationStore } from '../../stores/store'
import { ResponseStatus } from '../../stores/types'

export const Newsletter = () => {
    const subscribeToNewsletter = useApplicationStore(state => state.subscribeToNewsletter)
    const subscription = useApplicationStore(state => state.subscription)
    const [email, setEmail] = useState<string>('')

    const handleNewsletterSubscription = () => {
        subscribeToNewsletter(email)
        setEmail('')
    }

    useEffect(() => {
        setEmail('')
    })

    return (
        <Flex
            height={'250px'}
            width={'100%'}
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'1em'}
            position={'relative'}
        >
            <Image
                src={'/newsletter-background2.jpg'}
                width={'100%'}
                height={'100%'}
                position={'absolute'}
                zIndex={'1'}
            />
            <Text
                fontSize={'30px'}
                fontWeight={'700'}
                zIndex={'5'}
            >NEWSLETTER</Text>

            <Flex zIndex={'5'} width={'70%'} justifyContent={'center'}>
                <Form>
                    <Flex>
                        <Input
                            type='email'
                            bg={'#fff'}
                            width={'350px'}
                            placeholder={'email@example.com'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            bg={'red'}
                            color={'#fff'}
                            gap={'10px'}
                            _hover={{ bg: '#000' }}
                            onClick={handleNewsletterSubscription}
                        >
                            PRIJAVITE SE
                            <BsFillSendFill color='#fff' />
                        </Button>
                    </Flex>
                    {subscription.status === ResponseStatus.Error &&
                        <Text color={'red'} ml={'20px'}>
                            Wrong email format!
                        </Text>}
                </Form>
            </Flex>
        </Flex>
    )
}
