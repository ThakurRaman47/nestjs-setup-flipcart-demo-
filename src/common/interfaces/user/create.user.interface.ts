import { Address } from "./address.interface"


export interface createUser {
    firstName:string
    lastName:string
    email:string
    password:string
    address:Address[]
    country : string
    gender : string
    dob : Date,
    profilePic?:string
}