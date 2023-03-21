import { Button, Flex, FormControl, Input, Modal, ModalCloseButton, ModalContent, ModalOverlay, Select, Text } from '@chakra-ui/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useApplicationStore } from '../../../stores/store';
import { IoMdPersonAdd } from 'react-icons/io'
import { MdLibraryAdd } from 'react-icons/md'
import { AddBook } from '../../../types/AddBook';
import { AddAuthor } from '../../../types/AddAuthor';
import { ResponseStatus } from '../../../stores/types';

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    getAuthors: () => Promise<void>
}

type Inputs = {
    firstName: string
    lastName: string
    description: string
}

export const AddAuthorForm = ({ isOpen, onOpen, onClose, getAuthors }: Props) => {

    const addAuthor = useApplicationStore(state => state.addAuthor)
    const addAuthorRes = useApplicationStore(state => state.addAuthorRes)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async data => {
        await addAuthor(data as unknown as AddAuthor)
        if (addAuthorRes.status === ResponseStatus.Success)
            onClose()
        await getAuthors()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent css={
                {
                    position: 'absolute',
                    backgroundColor: '#fff',
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                    width: '500px',
                    padding: '2em',
                    flexDirection: 'column',
                    alignItems: 'center',
                }
            }>
                <ModalCloseButton />
                <Text fontSize="2xl" marginBottom={'20px'}>Dodajte novog autora!</Text>
                <FormControl css={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px'
                    }
                }>
                    <Input type='text' width={'75%'} placeholder='Ime' {...register("firstName", { required: true })} />
                    <Input type='text' width={'75%'} placeholder='Prezime' {...register("lastName", { required: true })} />
                    <Input type='text' width={'75%'} placeholder='Opis pisca' {...register("description", { required: true })} />
                </FormControl>
                <Button width={'75%'} backgroundColor={'#000'} color='#fff' marginTop={'20px'} _hover={{ backgroundColor: '#ff6600' }} onClick={handleSubmit(onSubmit)}>Dodaj autora</Button>
            </ModalContent>
        </Modal >
    )
}
