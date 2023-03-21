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
import { Newsletter } from '../types/Newsletter'


export type NewsletterStore = NewsletterStoreState & NewsletterStoreActions

type NewsletterSubscriptionResponse = {
    data: Book[]
    error: null | string
    status: ResponseStatus
}



export type NewsletterStoreActions = {
    subscribeToNewsletter: (email: string) => Promise<void>
    sendNewsletter: (newsletter: Newsletter) => Promise<void>
}

export type NewsletterStoreState = {
    subscription: NewsletterSubscriptionResponse
    sendNewsletterRes: NewsletterSubscriptionResponse
}

const state: NewsletterStoreState = {
    subscription: {
        data: [],
        error: '',
        status: ResponseStatus.Loading
    },
    sendNewsletterRes: {
        data: [],
        error: '',
        status: ResponseStatus.Loading
    }
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
    },
    sendNewsletter: async (newsletter: Newsletter) => {
        set(
            produce((state: AppState) => {
                state.sendNewsletterRes.status = ResponseStatus.Loading
                return state
            })
        )
        try {
            const body = new FormData()
            body.append('File', newsletter.file, 'filename.png')
            body.append('Title', newsletter.title)
            body.append('Content', newsletter.content)
            body.append('CreatorId', get().loggedUser.data[0].id)
            const res = await axios.post(`${process.env.REACT_APP_URL}/newsletter/send`,
                body,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + get().token
                    }
                })
            set(
                produce((state: AppState) => {
                    state.sendNewsletterRes.data = res.data
                    state.sendNewsletterRes.status = ResponseStatus.Success
                    return state
                })
            )
        }
        catch (err) {
            console.log(err)
            set(
                produce((state: AppState) => {
                    state.sendNewsletterRes.status = ResponseStatus.Error
                    return state
                })
            )
        }
    }
})

