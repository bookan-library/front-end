import { Button, Flex, FormControl, Input, Modal, ModalCloseButton, ModalContent, ModalOverlay, Select, Text } from '@chakra-ui/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useApplicationStore } from '../../../stores/store';
import { IoMdPersonAdd } from 'react-icons/io'
import { MdLibraryAdd } from 'react-icons/md'
import { AddBook } from '../../../types/AddBook';
import { AddAuthor } from '../../../types/AddAuthor';
import { ResponseStatus } from '../../../stores/types';
import { AddPublisher } from '../../../types/AddPublisher';

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    getPublishers: () => Promise<void>
}

type Inputs = {
    name: string
    street: string
    streetNumber: string
    city: string
    postalCode: string
    country: string
}

export const AddPublisherForm = ({ isOpen, onOpen, onClose }: Props) => {

    const addPublisher = useApplicationStore(state => state.addPublisher)
    const getPublishers = useApplicationStore(state => state.getPublishers)
    const addPublisherRes = useApplicationStore(state => state.addPublisherRes)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async data => {
        addPublisher(data as unknown as AddPublisher)
        if (addPublisherRes.status === ResponseStatus.Success)
            onClose()
        await getPublishers()
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
                <Text fontSize="2xl" marginBottom={'20px'}>Dodajte novog izdavaca!</Text>
                <FormControl css={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px'
                    }
                }>
                    <Input type='text' width={'75%'} placeholder='Ime' {...register("name", { required: true })} />
                    <Flex justify={'center'} gap={'5%'}>
                        <Input type='text' width={'45%'} placeholder='Street' {...register("street", { required: true })} />
                        <Input type='text' width={'25%'} placeholder='Number' {...register("streetNumber", { required: true })} />
                    </Flex>
                    <Flex justify={'center'} gap={'5%'}>
                        <Input type='text' width={'40%'} placeholder='City' {...register("city", { required: true })} />
                        <Input type='text' width={'30%'} placeholder='Postal code' {...register("postalCode", { required: true })} />
                    </Flex>
                    <Input type='text' width={'75%'} placeholder='Country' {...register("country", { required: true })} />
                </FormControl>
                <Button width={'75%'} backgroundColor={'#000'} color='#fff' marginTop={'20px'} _hover={{ backgroundColor: '#ff6600' }} onClick={handleSubmit(onSubmit)}>Dodaj izdavaca</Button>
            </ModalContent>
        </Modal >
    )
}

