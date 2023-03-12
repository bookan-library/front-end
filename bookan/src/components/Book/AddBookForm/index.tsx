import { Button, Flex, FormControl, Input, Modal, ModalCloseButton, ModalContent, ModalOverlay, Select, Text } from '@chakra-ui/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useApplicationStore } from '../../../stores/store';
import { IoMdPersonAdd } from 'react-icons/io'
import { MdLibraryAdd } from 'react-icons/md'
import { AddBook } from '../../../types/AddBook';

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

type Inputs = {
    name: string
    description: string
    pageNumber: string
    publishingYear: string
    file: string
    categoryId: string
    authorId: string
    publisherId: string
}

export const AddBookForm = ({ isOpen, onOpen, onClose }: Props) => {

    const getAuthors = useApplicationStore(state => state.getAuthors)
    const authors = useApplicationStore(state => state.authors)
    const getPublishers = useApplicationStore(state => state.getPublishers)
    const publishers = useApplicationStore(state => state.publishers)
    const getCategories = useApplicationStore(state => state.getCategories)
    const categories = useApplicationStore(state => state.categories)
    const addBook = useApplicationStore(state => state.addBook)
    const addBookRes = useApplicationStore(state => state.addBookRes)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        const book = {
            name: data.name,
            description: data.description,
            pageNumber: data.pageNumber,
            publishingYear: data.publishingYear,
            file: selectedFile,
            categoryId: data.categoryId,
            authorId: data.authorId,
            publisherId: data.publisherId
        }
        addBook(book as unknown as AddBook);
        if (addBookRes.error === null)
            onClose()
    }
    const [selectedFile, setSelectedFile] = useState<File>();

    useEffect(() => {
        getAuthors()
        getPublishers()
        getCategories()
    }, [])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

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
                <Text fontSize="2xl" marginBottom={'20px'}>Dodajte novu knjigu!</Text>
                <FormControl css={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px'
                    }
                }>
                    <Input type='text' width={'75%'} placeholder='Naziv' {...register("name", { required: true })} />
                    <Input type='text' width={'75%'} placeholder='Opis' {...register("description", { required: true })} />
                    <Input type='text' width={'75%'} placeholder='Broj strana' {...register("pageNumber", { required: true })} />                    <Input type='text' width={'75%'} placeholder='Godina objavljivanja' {...register("publishingYear", { required: true })} />
                    <Flex width={'75%'} gap={'5%'}>
                        <Select placeholder='Select author' {...register("authorId", { required: true })}>
                            {
                                authors.data.map(author =>
                                    <option value={author.id}>
                                        {author.firstName + ' ' + author.lastName}
                                    </option>
                                )
                            }
                        </Select>
                        <Button>
                            <IoMdPersonAdd />
                        </Button>
                    </Flex>
                    <Flex width={'75%'} gap={'5%'}>
                        <Select placeholder='Select publisher' {...register("publisherId", { required: true })}>
                            {
                                publishers.data.map(publisher =>
                                    <option value={publisher.id}>
                                        {publisher.name}
                                    </option>
                                )
                            }
                        </Select>
                        <Button>
                            <MdLibraryAdd />
                        </Button>
                    </Flex>
                    <Select placeholder='Select category' width={'75%'} {...register("categoryId", { required: true })}>
                        {
                            categories.data.map(category =>
                                <option value={category.id}>
                                    {category.name}
                                </option>
                            )
                        }
                    </Select>
                    <Input type='file' width={'75%'} onChange={handleFileChange} />
                </FormControl>
                <Button width={'75%'} backgroundColor={'#000'} color='#fff' marginTop={'20px'} _hover={{ backgroundColor: '#ff6600' }} onClick={handleSubmit(onSubmit)}>Dodaj knjigu</Button>
            </ModalContent>
        </Modal >
    )
}
