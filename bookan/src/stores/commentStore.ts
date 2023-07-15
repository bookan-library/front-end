import { StateCreator } from "zustand";
import { Buyer } from "../Model/Buyer";
import { LoginCredentials } from "../types/LoginCredentials";
import { RegisterBuyer } from "../types/RegisterBuyer";
import { ApiResponse, AppState, ResponseStatus } from "./types";
import produce from "immer";
import axios from "axios";
import env from "react-dotenv";
import { RegisterSeller } from "../types/RegisterSeller";
import { Author } from "../Model/Author";
import { Category } from "../Model/Category";
import { AddComment } from "../types/AddComment";
import { CommentStatus } from "../types/CommentStatus";
import { toast } from "react-toastify";

export type CommentStore = CommentStoreState & CommentStoreActions;

export type CommentResponse = {
  data: [];
  error: null;
  status: ResponseStatus;
};

export type CommentStoreActions = {
  addComment: (comment: AddComment) => Promise<void>;
  getCommentsForBook: (bookId: string) => Promise<void>;
  getPendingComments: () => Promise<void>;
  approveComment: (commentId: number, isApproved: number) => Promise<void>;
};

export type CommentStoreState = {
  addCommentRes: CommentResponse;
  comments: CommentResponse;
  pendingComments: CommentResponse;
  approveCommentRes: CommentResponse;
};

const state: CommentStoreState = {
  addCommentRes: {
    data: [],
    error: null,
    status: ResponseStatus.Loading,
  },
  comments: {
    data: [],
    error: null,
    status: ResponseStatus.Loading,
  },
  pendingComments: {
    data: [],
    error: null,
    status: ResponseStatus.Loading,
  },
  approveCommentRes: {
    data: [],
    error: null,
    status: ResponseStatus.Loading,
  },
};

export const commentStoreSlice: StateCreator<AppState, [], [], CommentStore> = (
  set,
  get
) => ({
  ...state,
  addComment: async (comment: AddComment) => {
    set(
      produce((state: AppState) => {
        state.addCommentRes.status = ResponseStatus.Loading;
        return state;
      })
    );
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/comments/add`,
        comment,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + get().token,
          },
        }
      );
      set(
        produce((state: AppState) => {
          state.addCommentRes.data = res.data;
          state.addCommentRes.status = ResponseStatus.Success;
          return state;
        })
      );
      toast.success("Comment successfully added!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      console.log(err);
      set(
        produce((state: AppState) => {
          state.addCommentRes.status = ResponseStatus.Error;
          return state;
        })
      );
      toast.error("Error when adding comment!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
  getCommentsForBook: async (bookId: string) => {
    set(
      produce((state: AppState) => {
        state.comments.status = ResponseStatus.Loading;
        return state;
      })
    );
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/comments/${bookId}`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      set(
        produce((state: AppState) => {
          state.comments.data = res.data;
          state.comments.status = ResponseStatus.Success;
          return state;
        })
      );
    } catch (err) {
      console.log(err);
      set(
        produce((state: AppState) => {
          state.comments.status = ResponseStatus.Error;
          return state;
        })
      );
    }
  },
  getPendingComments: async () => {
    set(
      produce((state: AppState) => {
        state.pendingComments.status = ResponseStatus.Loading;
        return state;
      })
    );
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/comments/pending`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + get().token,
          },
        }
      );
      set(
        produce((state: AppState) => {
          state.pendingComments.data = res.data;
          state.pendingComments.status = ResponseStatus.Success;
          return state;
        })
      );
    } catch (err) {
      console.log(err);
      set(
        produce((state: AppState) => {
          state.pendingComments.status = ResponseStatus.Error;
          return state;
        })
      );
    }
  },
  approveComment: async (commentId: number, isApproved: number) => {
    set(
      produce((state: AppState) => {
        state.approveCommentRes.status = ResponseStatus.Loading;
        return state;
      })
    );
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_URL}/comments/approve`,
        {
          id: commentId,
          isApproved: isApproved,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + get().token,
          },
        }
      );
      set(
        produce((state: AppState) => {
          state.approveCommentRes.data = res.data;
          state.approveCommentRes.status = ResponseStatus.Success;
          return state;
        })
      );
      toast.success("Comment approved/disapproved!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      console.log(err);
      set(
        produce((state: AppState) => {
          state.approveCommentRes.status = ResponseStatus.Error;
          return state;
        })
      );
      toast.error("Error when approving/disapproving comment!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
});
