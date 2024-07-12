import { Address } from "cluster"

export interface updateUser {
    firstName?:string
    lastName?:string
    email?:string
    password?:string
    address?:Address[]
    country?: string
    gender?: string
    dob?: Date,
    profilePic?:string
}