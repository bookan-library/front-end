import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { AuthStore, AuthStoreActions, authStoreSlice, AuthStoreState } from './authStore'


export const useApplicationStore = create<AuthStore>()(
    persist(
        immer((...a) => ({
            ...authStoreSlice(...a),
            // ...fileStoreSlice(...a),
        })),
        {
            // partialize: ({ token, user, boxType }) => ({
            //     token,
            //     user,
            //     boxType,
            // }),
            name: 'application-store',
        }
    )
)