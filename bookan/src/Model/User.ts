import { Address } from "./Address"

export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    address: Address
    emailConfirmed: boolean
}