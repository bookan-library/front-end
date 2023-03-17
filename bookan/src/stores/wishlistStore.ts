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
import { AddComment } from '../types/AddComment'


export type WishlistStore = WishlistStoreState & WishlistStoreActions

export type WishlistResponse = {
    data: []
    error: null
    status: ResponseStatus
}

export type WishlistStoreActions = {
    addToWishlist: (bookId: number) => Promise<void>
    removeFromWishlist: (bookId: number) => Promise<void>
    getWishlist: (pageNumber: number) => Promise<void>
    getWishlistCount: () => Promise<void>
    checkIfBookInWishlist: (bookId: number) => Promise<void>
}

export type WishlistStoreState = {
    addToWishlistRes: WishlistResponse
    removeFromWishlistRes: WishlistResponse
    wishlist: WishlistResponse
    wishlistCount: WishlistResponse
    isBookInWishlist: WishlistResponse
}

const state: WishlistStoreState = {
    addToWishlistRes: {
        data: [],
        error: null,
        status: ResponseStatus.Loading
    },
    wishlist: {
        data: [],
        error: null,
        status: ResponseStatus.Loading
    },
    isBookInWishlist: {
        data: [],
        error: null,
        status: ResponseStatus.Loading
    },
    removeFromWishlistRes: {
        data: [],
        error: null,
        status: ResponseStatus.Loading
    },
    wishlistCount: {
        data: [],
        error: null,
        status: ResponseStatus.Loading
    }
}

export const wishlistStoreSlice: StateCreator<AppState, [], [], WishlistStore> = (set, get) => ({
    ...state,
    addToWishlist: async (bookId: number) => {
        set(
            produce((state: AppState) => {
                state.addToWishlistRes.status = ResponseStatus.Loading
                return state
            })
        )
        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/wishlist/add`,
                {
                    userEmail: get().loggedUser.data[0].email,
                    bookId: bookId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + get().token
                    }
                })
            set(
                produce((state: AppState) => {
                    state.addToWishlistRes.data = res.data
                    state.addToWishlistRes.status = ResponseStatus.Success
                    return state
                })
            )
        }
        catch (err) {
            console.log(err)
            set(
                produce((state: AppState) => {
                    state.addToWishlistRes.status = ResponseStatus.Error
                    return state
                })
            )
        }
    },
    removeFromWishlist: async (bookId: number) => {
        set(
            produce((state: AppState) => {
                state.removeFromWishlistRes.status = ResponseStatus.Loading
                return state
            })
        )
        try {
            const res = await axios.delete(`${process.env.REACT_APP_URL}/wishlist/${bookId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + get().token
                    }
                },
            )
            set(
                produce((state: AppState) => {
                    state.removeFromWishlistRes.data = res.data
                    state.removeFromWishlistRes.status = ResponseStatus.Success
                    return state
                })
            )
        }
        catch (err) {
            console.log(err)
            set(
                produce((state: AppState) => {
                    state.removeFromWishlistRes.status = ResponseStatus.Error
                    return state
                })
            )
        }
    },
    getWishlist: async (pageNumber: number) => {
        set(
            produce((state: AppState) => {
                state.wishlist.status = ResponseStatus.Loading
                return state
            })
        )
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/wishlist?pageNumber=${pageNumber}&buyerEmail=${get().loggedUser.data[0].email}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + get().token
                    }
                },
            )
            set(
                produce((state: AppState) => {
                    state.wishlist.data = res.data
                    state.wishlist.status = ResponseStatus.Success
                    return state
                })
            )
        }
        catch (err) {
            console.log(err)
            set(
                produce((state: AppState) => {
                    state.wishlist.status = ResponseStatus.Error
                    return state
                })
            )
        }
    },
    getWishlistCount: async () => {
        set(
            produce((state: AppState) => {
                state.wishlistCount.status = ResponseStatus.Loading
                return state
            })
        )
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/wishlist/${get().loggedUser.data[0].id}/count`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + get().token
                    }
                },
            )
            set(
                produce((state: AppState) => {
                    state.wishlistCount.data = res.data
                    state.wishlistCount.status = ResponseStatus.Success
                    return state
                })
            )
        }
        catch (err) {
            console.log(err)
            set(
                produce((state: AppState) => {
                    state.wishlistCount.status = ResponseStatus.Error
                    return state
                })
            )
        }
    },
    checkIfBookInWishlist: async (bookId: number) => {
        set(
            produce((state: AppState) => {
                state.isBookInWishlist.status = ResponseStatus.Loading
                return state
            })
        )
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/wishlist/check/${bookId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + get().token
                    }
                })
            set(
                produce((state: AppState) => {
                    state.isBookInWishlist.data = res.data
                    state.isBookInWishlist.status = ResponseStatus.Success
                    return state
                })
            )
        }
        catch (err) {
            console.log(err)
            set(
                produce((state: AppState) => {
                    state.isBookInWishlist.status = ResponseStatus.Error
                    return state
                })
            )
        }
    }
})
