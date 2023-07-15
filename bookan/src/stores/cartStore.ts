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
import { CartItem } from "../Model/CartItem";
import { toast } from "react-toastify";

export type CartStore = CartStoreState & CartStoreActions;

type CartResponse = {
  data: CartItem[];
  error: null;
  status: ResponseStatus;
};

export type CartStoreActions = {
  addToCart: (bookId: number, quantity: number) => Promise<void>;
  getUserCart: () => Promise<void>;
  updateInCart: (bookId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
};

export type CartStoreState = {
  addToCartRes: CartResponse;
  cart: CartResponse;
  updateInCartRes: CartResponse;
  removeFromCartRes: CartResponse;
};

const state: CartStoreState = {
  addToCartRes: {
    data: [],
    error: null,
    status: ResponseStatus.Loading,
  },
  cart: {
    data: [],
    error: null,
    status: ResponseStatus.Loading,
  },
  updateInCartRes: {
    data: [],
    error: null,
    status: ResponseStatus.Loading,
  },
  removeFromCartRes: {
    data: [],
    error: null,
    status: ResponseStatus.Loading,
  },
};

export const cartStoreSlice: StateCreator<AppState, [], [], CartStore> = (
  set,
  get
) => ({
  ...state,
  addToCart: async (bookId: number, quantity: number) => {
    set(
      produce((state: AppState) => {
        state.addToCartRes.status = ResponseStatus.Loading;
        return state;
      })
    );
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/cart/add`,
        {
          buyerId: get().loggedUser.data[0].id,
          bookId: bookId,
          quantity: quantity,
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
          state.addToCartRes.data = res.data;
          state.addToCartRes.status = ResponseStatus.Success;
          return state;
        })
      );
      toast.success("Book successfully added to cart!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      console.log(err);
      set(
        produce((state: AppState) => {
          state.addToCartRes.status = ResponseStatus.Error;
          return state;
        })
      );
      toast.error("Error when adding book to cart!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
  getUserCart: async () => {
    set(
      produce((state: AppState) => {
        state.cart.status = ResponseStatus.Loading;
        return state;
      })
    );
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/cart/${get().loggedUser.data[0].id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + get().token,
          },
        }
      );
      set(
        produce((state: AppState) => {
          state.cart.data = res.data;
          state.cart.status = ResponseStatus.Success;
          return state;
        })
      );
    } catch (err) {
      console.log(err);
      set(
        produce((state: AppState) => {
          state.cart.status = ResponseStatus.Error;
          return state;
        })
      );
    }
  },
  updateInCart: async (quantity: number, bookId: number) => {
    set(
      produce((state: AppState) => {
        state.updateInCartRes.status = ResponseStatus.Loading;
        return state;
      })
    );
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/cart/update`,
        {
          buyerId: get().loggedUser.data[0].id,
          bookId: bookId,
          quantity: quantity,
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
          state.updateInCartRes.data = res.data;
          state.updateInCartRes.status = ResponseStatus.Success;
          return state;
        })
      );
    } catch (err) {
      console.log(err);
      set(
        produce((state: AppState) => {
          state.updateInCartRes.status = ResponseStatus.Error;
          return state;
        })
      );
    }
  },
  removeFromCart: async (cartItemId: number) => {
    set(
      produce((state: AppState) => {
        state.removeFromCartRes.status = ResponseStatus.Loading;
        return state;
      })
    );
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_URL}/cart/${cartItemId}/remove`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + get().token,
          },
        }
      );
      set(
        produce((state: AppState) => {
          state.removeFromCartRes.data = res.data;
          state.removeFromCartRes.status = ResponseStatus.Success;
          return state;
        })
      );
      toast.success("Book successfully removed from cart!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      console.log(err);
      set(
        produce((state: AppState) => {
          state.removeFromCartRes.status = ResponseStatus.Error;
          return state;
        })
      );
      toast.error("Error when removing book from cart!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
});
