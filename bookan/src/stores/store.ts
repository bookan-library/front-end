import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { AuthorStore, authorStoreSlice } from './authorStore'
import { AuthStore, AuthStoreActions, authStoreSlice, AuthStoreState } from './authStore'
import { BookStore, bookStoreSlice } from './bookStore'
import { CategoryStore, categoryStoreSlice } from './categoryStore'
import { PublisherStore, publisherStoreSlice } from './publisherStore'


export const useApplicationStore = create<AuthStore & AuthorStore & PublisherStore & CategoryStore & BookStore>()(
    persist(
        immer((...a) => ({
            ...authStoreSlice(...a),
            ...authorStoreSlice(...a),
            ...publisherStoreSlice(...a),
            ...categoryStoreSlice(...a),
            ...bookStoreSlice(...a)
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