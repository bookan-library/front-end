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


export type CommentStore = CommentStoreState & CommentStoreActions

export type CommentResponse = {
    data: []
    error: null
    status: ResponseStatus
}

export type CommentStoreActions = {
    addComment: (comment: AddComment) => void

}

export type CommentStoreState = {
    addCommentRes: CommentResponse
}

const state: CommentStoreState = {
    addCommentRes: {
        data: [],
        error: null,
        status: ResponseStatus.Loading
    },
}

export const commentStoreSlice: StateCreator<AppState, [], [], CommentStore> = (set, get) => ({
    ...state,
    addComment: async (comment: AddComment) => {
        set(
            produce((state: AppState) => {
                state.addCommentRes.status = ResponseStatus.Loading
                return state
            })
        )
        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/comments/add`,
                comment,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + get().token
                    }
                })
            set(
                produce((state: AppState) => {
                    state.addCommentRes.data = res.data
                    state.addCommentRes.status = ResponseStatus.Success
                    return state
                })
            )
        }
        catch (err) {
            console.log(err)
            set(
                produce((state: AppState) => {
                    state.addCommentRes.status = ResponseStatus.Error
                    return state
                })
            )
        }
    }
})
