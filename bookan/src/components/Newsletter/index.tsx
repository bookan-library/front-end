import { Button, Flex, Input, Text, Image, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsFillSendFill } from 'react-icons/bs'
import { Form } from 'react-router-dom'
import { newsletterSchema } from '../../schemas/newsletterSchema'
import { useApplicationStore } from '../../stores/store'
import { ResponseStatus } from '../../stores/types'
import { displayToast } from '../../utils/toast'

interface Inputs {
    email: string
}

export const Newsletter = () => {
    const subscribeToNewsletter = useApplicationStore(state => state.subscribeToNewsletter)
    const subscription = useApplicationStore(state => state.subscription)
    const toast = useToast()
    // const [email, setEmail] = useState<string>('')

    // const handleNewsletterSubscription = () => {
    //     subscribeToNewsletter(email)
    //     // setEmail('')
    // }

    // useEffect(() => {
    //     setEmail('')
    // })

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>(
        {
            resolver: yupResolver(newsletterSchema)
        }
    );

    const onSubmit: SubmitHandler<Inputs> = data => {
        // const newsletter = {
        //     title: data.title,
        //     content: data.content,
        //     file: selectedFile
        // }
        subscribeToNewsletter(data.email)
        if (subscription.status === ResponseStatus.Success) {
            displayToast("Newsletter successfully sent!", toast, subscription.status)
        }
    }

    return (
        <Flex
            mt={'auto'}
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
                            // value={email}
                            {...register("email")}
                        // onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            bg={'red'}
                            color={'#fff'}
                            gap={'10px'}
                            _hover={{ bg: '#000' }}
                            onClick={handleSubmit(onSubmit)}
                        >
                            PRIJAVITE SE
                            <BsFillSendFill color='#fff' />
                        </Button>
                    </Flex>
                </Form>
            </Flex>
        </Flex>
    )
}
