import { StateCreator } from 'zustand'
import { Buyer } from '../Model/Buyer'
import { LoginCredentials } from '../types/LoginCredentials'
import { RegisterBuyer } from '../types/RegisterBuyer'
import { ApiResponse, ResponseStatus } from './types'
import produce from "immer"
import axios from 'axios'
import env from "react-dotenv";


export type AuthStore = AuthStoreState & AuthStoreActions

export type AuthStoreActions = {
    login: (LoginCredentials: LoginCredentials) => void
    logout: () => void
    registerBuyer: (buyer: RegisterBuyer) => void
    registerBuyerDetails: ApiResponse
}

export type AuthStoreState = {
    token: string | null
    buyer: Buyer | null
}

const state: AuthStoreState = {
    token: null,
    buyer: null,
}

export const authStoreSlice: StateCreator<AuthStore> = (set, get) => ({
    ...state,
    login: async (LoginCredentials: LoginCredentials) => {
        // // const token = await authService.login(dto)
        // // const user = await authService.getMe(token)
        // set((state) => ({
        //     token,
        //     user,
        // }))
    },
    registerBuyerDetails: {
        data: [],
        error: null,
        status: ResponseStatus.Loading,
    },
    registerBuyer: async (buyer: RegisterBuyer) => {
        console.log(env.REACT_APP_URL)
        set(
            produce((state: AuthStore) => {
                state.registerBuyerDetails.status = ResponseStatus.Loading;
                return state
            })
        )
        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/auth/register`,
                {
                    FirstName: buyer.firstName,
                    LastName: buyer.lastName,
                    Email: buyer.email,
                    PhoneNumber: buyer.email,
                    Address: {
                        Country: buyer.country,
                        City: buyer.city,
                        Street: buyer.street,
                        PostalCode: buyer.postalCode,
                        StreetNumber: buyer.number
                    },
                    Password: buyer.password,
                    ConfirmPassword: buyer.confirmPassword
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            set(
                produce((state: AuthStore) => {
                    state.registerBuyerDetails.data = [res.data]
                    state.registerBuyerDetails.status = ResponseStatus.Success
                    return state
                })
            )
        } catch (err) {
            console.log(err)
            set(
                produce((state: AuthStore) => {
                    state.registerBuyerDetails.status = ResponseStatus.Error
                    return state
                })
            )
        }
    },
    logout: () => {
        set((state) => ({
            token: null,
            user: null,
        }))
    },
})

