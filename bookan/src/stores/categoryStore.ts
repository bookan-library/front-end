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
import { Category } from '../Model/Category'


export type CategoryStore = CategoryStoreState & CategoryStoreActions

type CategoryResponse = {
    data: Category[]
    error: null
    status: ResponseStatus
}

export type CategoryStoreActions = {
    getCategories: () => Promise<void>

}

export type CategoryStoreState = {
    categories: CategoryResponse
}

const state: CategoryStoreState = {
    categories: {
        data: [],
        error: null,
        status: ResponseStatus.Loading
    },
}

export const categoryStoreSlice: StateCreator<AppState, [], [], CategoryStore> = (set, get) => ({
    ...state,
    getCategories: async () => {
        set(
            produce((state: AppState) => {
                state.categories.status = ResponseStatus.Loading
                return state
            })
        )
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/categories`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            set(
                produce((state: AppState) => {
                    state.categories.data = res.data
                    state.categories.status = ResponseStatus.Success
                    return state
                })
            )
        }
        catch (err) {
            console.log(err)
            set(
                produce((state: AppState) => {
                    state.categories.status = ResponseStatus.Error
                    return state
                })
            )
        }
    }
})
