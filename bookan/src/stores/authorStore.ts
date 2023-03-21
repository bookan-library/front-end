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
import { AddAuthor } from '../types/AddAuthor'


export type AuthorStore = AuthorStoreState & AuthorStoreActions

type AuthorResponse = {
    data: Author[]
    error: null
    status: ResponseStatus
}

export type AuthorStoreActions = {
    getAuthors: () => Promise<void>
    addAuthor: (author: AddAuthor) => Promise<void>
}

export type AuthorStoreState = {
    authors: AuthorResponse
    addAuthorRes: AuthorResponse
}

const state: AuthorStoreState = {
    authors: {
        data: [],
        error: null,
        status: ResponseStatus.Loading
    },
    addAuthorRes: {
        data: [],
        error: null,
        status: ResponseStatus.Loading
    },
}

export const authorStoreSlice: StateCreator<AppState, [], [], AuthorStore> = (set, get) => ({
    ...state,
    getAuthors: async () => {
        set(
            produce((state: AuthorStore) => {
                state.authors.status = ResponseStatus.Loading
                return state
            })
        )
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/authors`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + get().token
                    }
                })
            set(
                produce((state: AuthorStore) => {
                    state.authors.data = res.data
                    state.authors.status = ResponseStatus.Success
                    return state
                })
            )
        }
        catch (err) {
            console.log(err)
            set(
                produce((state: AuthorStore) => {
                    state.authors.status = ResponseStatus.Error
                    return state
                })
            )
        }
    },
    addAuthor: async (author: AddAuthor) => {
        set(
            produce((state: AppState) => {
                state.addAuthorRes.status = ResponseStatus.Loading
                return state
            })
        )
        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/authors/add`,
                author,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + get().token
                    }
                })
            set(
                produce((state: AppState) => {
                    state.addAuthorRes.data = res.data
                    state.addAuthorRes.status = ResponseStatus.Success
                    return state
                })
            )
        }
        catch (err) {
            console.log(err)
            set(
                produce((state: AppState) => {
                    state.addAuthorRes.status = ResponseStatus.Error
                    return state
                })
            )
        }
    }
})

