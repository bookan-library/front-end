import { AuthorStore } from "./authorStore"
import { AuthStore } from "./authStore"
import { BookStore } from "./bookStore"
import { CartStore } from "./cartStore"
import { CategoryStore } from "./categoryStore"
import { CommentStore } from "./commentStore"
import { NewsletterStore } from "./newsletterStore"
import { PublisherStore } from "./publisherStore"
import { WishlistStore } from "./wishlistStore"

export type ApiResponse = {
    data: any
    status: ResponseStatus
    error: null
}

export enum ResponseStatus {
    Success = "success",
    Loading = "loading",
    Error = "error",
}

export type AppState = AuthorStore & AuthStore & PublisherStore
    & CategoryStore & BookStore & NewsletterStore & CommentStore & WishlistStore & CartStore