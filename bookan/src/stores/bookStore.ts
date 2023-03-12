import { StateCreator } from 'zustand'
import { Buyer } from '../Model/Buyer'
import { LoginCredentials } from '../types/LoginCredentials'
import { RegisterBuyer } from '../types/RegisterBuyer'
import { ApiResponse, AppState, ResponseStatus } from './types'
import produce from "immer"
import axios from 'axios'
import env from "react-dotenv";
import { RegisterSeller } from '../types/RegisterSeller'
import { Author } from '../Model/Author'
import { AddBook } from '../types/AddBook'


export type BookStore = BookStoreState & BookStoreActions

type BookResponse = {
    data: Author[]
    error: null
    status: ResponseStatus
}

export type BookStoreActions = {
    addBook: (book: AddBook) => void

}

export type BookStoreState = {
    addBookRes: BookResponse
}

const state: BookStoreState = {
    addBookRes: {
        data: [],
        error: null,
        status: ResponseStatus.Loading
    },
}

export const bookStoreSlice: StateCreator<AppState, [], [], BookStore> = (set, get) => ({
    ...state,
    addBook: async (book: AddBook) => {
        set(
            produce((state: AppState) => {
                state.addBookRes.status = ResponseStatus.Loading
                return state
            })
        )
        try {
            const body = new FormData()
            body.append('File', book.file, 'filename.png')
            body.append('Description', book.description)
            body.append('Name', book.name)
            body.append('PageNumber', book.pageNumber.toString())
            body.append('AuthorId', book.authorId.toString())
            body.append('PublisherId', book.publisherId.toString())
            body.append('CategoryId', book.categoryId.toString())

            const res = await axios.post(`${process.env.REACT_APP_URL}/books/add`,
                body,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + get().token
                    }
                })
            set(
                produce((state: AppState) => {
                    state.addBookRes.data = res.data
                    state.addBookRes.status = ResponseStatus.Success
                    return state
                })
            )
        }
        catch (err) {
            console.log(err)
            set(
                produce((state: AppState) => {
                    state.addBookRes.status = ResponseStatus.Error
                    return state
                })
            )
        }
    }
})

