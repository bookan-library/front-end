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
import { Book } from '../Model/Book'


export type NewsletterStore = NewsletterStoreState & NewsletterStoreActions

type NewsletterSubscriptionResponse = {
    data: Book[]
    error: null | string
    status: ResponseStatus
}

export type NewsletterStoreActions = {
    subscribeToNewsletter: (email: string) => void
}

export type NewsletterStoreState = {
    subscription: NewsletterSubscriptionResponse
}

const state: NewsletterStoreState = {
    subscription: {
        data: [],
        error: '',
        status: ResponseStatus.Loading
    },
}

export const newsletterStoreSlice: StateCreator<AppState, [], [], NewsletterStore> = (set, get) => ({
    ...state,
    subscribeToNewsletter: async (email: string) => {
        set(
            produce((state: AppState) => {
                state.subscription.status = ResponseStatus.Loading
                return state
            })
        )
        try {
            if (email === '') {
                set(
                    produce((state: AppState) => {
                        state.subscription.status = ResponseStatus.Error
                        return state
                    })
                )
                return
            }
            const res = await axios.post(`${process.env.REACT_APP_URL}/newsletter/subscribe`,
                {
                    SubscriberEmail: email
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            set(
                produce((state: AppState) => {
                    state.subscription.data = res.data
                    state.subscription.status = ResponseStatus.Success
                    return state
                })
            )
        }
        catch (err) {
            console.log(err)
            set(
                produce((state: AppState) => {
                    state.subscription.status = ResponseStatus.Error
                    return state
                })
            )
        }
    }
})

