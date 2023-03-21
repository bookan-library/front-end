import { StateCreator } from 'zustand'
import { Buyer } from '../Model/Buyer'
import { LoginCredentials } from '../types/LoginCredentials'
import { RegisterBuyer } from '../types/RegisterBuyer'
import { ApiResponse, ResponseStatus } from './types'
import produce from "immer"
import axios from 'axios'
import env from "react-dotenv";
import { RegisterSeller } from '../types/RegisterSeller'


export type AuthStore = AuthStoreState & AuthStoreActions

export type AuthStoreActions = {
    login: (LoginCredentials: LoginCredentials) => Promise<void>
    logout: () => void
    registerBuyer: (buyer: RegisterBuyer) => Promise<void>
    getLoggedUser: () => Promise<void>
    verifyUser: (id: string | null, code: string | null) => Promise<void>
    verifiedUser: ApiResponse
    loggedUser: ApiResponse
    registerBuyerDetails: ApiResponse
    tokenResponse: ApiResponse
    registerSeller: (seller: RegisterSeller) => Promise<void>
    registerSellerDetails: ApiResponse
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
    tokenResponse: {
        data: [],
        error: null,
        status: ResponseStatus.Loading,
    },
    login: async (loginCredentials: LoginCredentials) => {
        set(
            produce((state: AuthStore) => {
                state.tokenResponse.status = ResponseStatus.Loading;
                return state
            })
        )
        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/auth/login`,
                {
                    email: loginCredentials.email,
                    password: loginCredentials.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            set(
                produce((state: AuthStore) => {
                    state.tokenResponse.data = [res.data.token]
                    state.token = res.data.token
                    state.tokenResponse.status = ResponseStatus.Success
                    return state
                })
            )
        } catch (err) {
            console.log(err)
            set(
                produce((state: AuthStore) => {
                    state.tokenResponse.status = ResponseStatus.Error
                    return state
                })
            )
        }
    },
    registerBuyerDetails: {
        data: [],
        error: null,
        status: ResponseStatus.Loading,
    },
    registerBuyer: async (buyer: RegisterBuyer) => {
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
        set(
            produce((state: AuthStore) => {
                state.token = null
                state.loggedUser = {
                    data: {},
                    error: null,
                    status: ResponseStatus.Loading,
                }
                return state
            })
        )
    },
    loggedUser: {
        data: {},
        error: null,
        status: ResponseStatus.Loading,
    },
    getLoggedUser: async () => {
        set(
            produce((state: AuthStore) => {
                state.loggedUser.status = ResponseStatus.Loading;
                return state
            })
        )
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/auth/user`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + get().token
                    }
                })
            set(
                produce((state: AuthStore) => {
                    state.loggedUser.data = [res.data]
                    state.loggedUser.status = ResponseStatus.Success
                    return state
                })
            )
        } catch (err) {
            console.log(err)
            set(
                produce((state: AuthStore) => {
                    state.loggedUser.status = ResponseStatus.Error
                    return state
                })
            )
        }
    },
    verifiedUser: {
        data: {},
        error: null,
        status: ResponseStatus.Loading,
    },
    verifyUser: async (id: string | null, code: string | null) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/auth/verify?id=${id}&code=${code}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            set(
                produce((state: AuthStore) => {
                    state.verifiedUser.data = [res.data]
                    state.verifiedUser.status = ResponseStatus.Success
                    return state
                })
            )
        } catch (err) {
            console.log(err)
            set(
                produce((state: AuthStore) => {
                    state.verifiedUser.status = ResponseStatus.Error
                    return state
                })
            )
        }
    },
    registerSellerDetails: {
        data: [],
        error: null,
        status: ResponseStatus.Loading,
    },
    registerSeller: async (seller: RegisterSeller) => {
        set(
            produce((state: AuthStore) => {
                state.registerSellerDetails.status = ResponseStatus.Loading;
                return state
            })
        )
        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/auth/register/seller`,
                {
                    FirstName: seller.firstName,
                    LastName: seller.lastName,
                    Email: seller.email,
                    PhoneNumber: seller.email,
                    Address: {
                        Country: seller.country,
                        City: seller.city,
                        Street: seller.street,
                        PostalCode: seller.postalCode,
                        StreetNumber: seller.number
                    },
                    Password: seller.password,
                    ConfirmPassword: seller.confirmPassword
                },


                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + get().token
                    }
                })
            set(
                produce((state: AuthStore) => {
                    state.registerSellerDetails.data = [res.data]
                    state.registerSellerDetails.status = ResponseStatus.Success
                    return state
                })
            )
        } catch (err) {
            console.log(err)
            set(
                produce((state: AuthStore) => {
                    state.registerSellerDetails.status = ResponseStatus.Error
                    return state
                })
            )
        }
    },
})

