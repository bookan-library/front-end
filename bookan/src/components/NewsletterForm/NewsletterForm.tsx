import { Button, FormControl, Input, Modal, ModalCloseButton, ModalContent, ModalOverlay, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { newsletterSchema } from '../../schemas/newsletterSchema'
import { useApplicationStore } from '../../stores/store'
import { ResponseStatus } from '../../stores/types'
import { Newsletter } from '../../types/Newsletter'
import { displayToast } from '../../utils/toast'
import { yupResolver } from '@hookform/resolvers/yup'

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

type Inputs = {
    content: string
    file: string
    title: string
}

export const NewsletterForm = ({ isOpen, onOpen, onClose }: Props) => {
    const sendNewsletter = useApplicationStore(state => state.sendNewsletter)
    const sendNewsletterRes = useApplicationStore(state => state.sendNewsletterRes)

    const [selectedFile, setSelectedFile] = useState<File>();
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>(

    );
    const toast = useToast()

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const onSubmit: SubmitHandler<Inputs> = data => {
        const newsletter = {
            title: data.title,
            content: data.content,
            file: selectedFile
        }
        sendNewsletter(newsletter as unknown as Newsletter);
        if (sendNewsletterRes.status === ResponseStatus.Success) {
            onClose()
            displayToast("Newsletter successfully sent!", toast, sendNewsletterRes.status)
        }
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
                <Text fontSize="2xl" marginBottom={'20px'}>Newsletter!</Text>
                <FormControl css={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px'
                    }
                }>
                    <Input type='text' width={'75%'} placeholder='Naslov' {...register("title", { required: true })} />
                    <Textarea width={'75%'} placeholder='Sadrzaj newsletter-a' {...register("content", { required: true })} />
                    <Input type='file' width={'75%'} onChange={handleFileChange} />
                </FormControl>
                <Button width={'75%'} backgroundColor={'#000'} color='#fff' marginTop={'20px'} _hover={{ backgroundColor: '#ff6600' }} onClick={handleSubmit(onSubmit)}>POSALJI NEWSLETTER</Button>
            </ModalContent>
        </Modal >
    )
}
