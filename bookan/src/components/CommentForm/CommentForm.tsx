import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/input'
import { Box, Flex } from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/textarea'
import { useToast } from '@chakra-ui/toast'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Book } from '../../Model/Book'
import { CommentResponse } from '../../stores/commentStore'
import { useApplicationStore } from '../../stores/store'
import { ResponseStatus } from '../../stores/types'
import { Roles } from '../../types/Roles'
import { displayToast } from '../../utils/toast'
import { LoginForm } from '../Auth/Login'


type Inputs = {
    nickname: string
    email: string
    comment: string
}

interface Props {
    book: Book
}

export const CommentForm = ({ book }: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const token = useApplicationStore(state => state.token)
    const loggedUser = useApplicationStore(state => state.loggedUser.data[0])
    const addComment = useApplicationStore(state => state.addComment)
    const addCommentRes = useApplicationStore(state => state.addCommentRes)
    const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
    const toast = useToast()
    const onSubmit: SubmitHandler<Inputs> = data => {
        if (loggedUser === undefined || loggedUser.role !== Roles.BUYER) {
            onOpenLogin()
            return
        }
        addComment({
            nickname: data.nickname,
            buyerId: loggedUser.id,
            bookId: book.id,
            comment: data.comment
        })
        displayToast("Comment successfully sent", toast, addCommentRes.status)
    }

    return (
        <>
            <Flex width={'100%'}>
                <Box width={'100%'}>
                    <Flex gap={'15px'} width={'100%'}>
                        <Input width={'40%'} placeholder='Ime/Nadimak' {...register('nickname', { required: true })} />
                        <Input width={'60%'} type={'email'} placeholder='Email adresa' {...register('email', { required: true })} />
                    </Flex>
                    <Textarea width={'100%'} mt={'15px'} height={'100px'} placeholder='Poruka' {...register('comment', { required: true })} />
                    <Button
                        mt={'15px'}
                        bg={'#000'}
                        color={'#fff'}
                        _hover={{
                            backgroundColor: 'red'
                        }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        POSALJI
                    </Button>
                </Box>
            </Flex>
            <LoginForm isOpen={isOpenLogin} onOpen={onOpenLogin} onClose={onCloseLogin}></LoginForm>
        </>

    )
}
