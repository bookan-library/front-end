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
import { Publisher } from "../Model/Publisher";
import { AddPublisher } from "../types/AddPublisher";
import { toast } from "react-toastify";

export type PublisherStore = PublisherStoreState & PublisherStoreActions;

type PublisherResponse = {
  data: Publisher[];
  error: null;
  status: ResponseStatus;
};

export type PublisherStoreActions = {
  getPublishers: () => Promise<void>;
  addPublisher: (publisher: AddPublisher) => Promise<void>;
};

export type PublisherStoreState = {
  publishers: PublisherResponse;
  addPublisherRes: PublisherResponse;
};

const state: PublisherStoreState = {
  publishers: {
    data: [],
    error: null,
    status: ResponseStatus.Loading,
  },
  addPublisherRes: {
    data: [],
    error: null,
    status: ResponseStatus.Loading,
  },
};

export const publisherStoreSlice: StateCreator<
  AppState,
  [],
  [],
  PublisherStore
> = (set, get) => ({
  ...state,
  getPublishers: async () => {
    set(
      produce((state: AppState) => {
        state.publishers.status = ResponseStatus.Loading;
        return state;
      })
    );
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/publishers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + get().token,
        },
      });
      set(
        produce((state: AppState) => {
          state.publishers.data = res.data;
          state.publishers.status = ResponseStatus.Success;
          return state;
        })
      );
    } catch (err) {
      console.log(err);
      set(
        produce((state: AppState) => {
          state.publishers.status = ResponseStatus.Error;
          return state;
        })
      );
    }
  },
  addPublisher: async (publisher: AddPublisher) => {
    set(
      produce((state: AppState) => {
        state.addPublisherRes.status = ResponseStatus.Loading;
        return state;
      })
    );
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/publishers/add`,
        {
          Name: publisher.name,
          Address: {
            Street: publisher.street,
            StreetNumber: publisher.streetNumber,
            City: publisher.city,
            PostalCode: publisher.postalCode,
            Country: publisher.country,
          },
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
          state.addPublisherRes.data = res.data;
          state.addPublisherRes.status = ResponseStatus.Success;
          return state;
        })
      );
      toast.success("Publisher successfully added!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      console.log(err);
      set(
        produce((state: AppState) => {
          state.addPublisherRes.status = ResponseStatus.Error;
          return state;
        })
      );
      toast.error("Error when adding publisher!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
});
