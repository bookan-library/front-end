import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { AuthorStore, authorStoreSlice } from './authorStore'
import { AuthStore, AuthStoreActions, authStoreSlice, AuthStoreState } from './authStore'
import { BookStore, bookStoreSlice } from './bookStore'
import { CartStore, cartStoreSlice } from './cartStore'
import { CategoryStore, categoryStoreSlice } from './categoryStore'
import { CommentStore, commentStoreSlice } from './commentStore'
import { NewsletterStore, newsletterStoreSlice } from './newsletterStore'
import { PublisherStore, publisherStoreSlice } from './publisherStore'
import { WishlistStore, wishlistStoreSlice } from './wishlistStore'


export const useApplicationStore = create<AuthStore & AuthorStore & PublisherStore & CategoryStore
    & BookStore & NewsletterStore & CommentStore & WishlistStore & CartStore>()(
        persist(
            immer((...a) => ({
                ...authStoreSlice(...a),
                ...authorStoreSlice(...a),
                ...publisherStoreSlice(...a),
                ...categoryStoreSlice(...a),
                ...bookStoreSlice(...a),
                ...newsletterStoreSlice(...a),
                ...commentStoreSlice(...a),
                ...wishlistStoreSlice(...a),
                ...cartStoreSlice(...a)
                // ...fileStoreSlice(...a),
            })),
            {
                //     // partialize: ({ token, user, boxType }) => ({
                //     //     token,
                //     //     user,
                //     //     boxType,
                //     // }),
                name: 'application-store',
            }
        )
    )