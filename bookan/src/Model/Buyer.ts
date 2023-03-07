import { Address } from "cluster"

export interface Buyer {
    id: number
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    address: Address
}