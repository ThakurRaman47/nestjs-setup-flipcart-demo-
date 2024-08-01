import {HttpStatus} from "@nestjs/common"
import { Response } from "express"


exports.successResponse = async function(res:Response,msg:string,statusCode:HttpStatus) {
    return res.status(statusCode).json({
        status:statusCode,
        msg:msg
    })
}

exports.successResponseWithData = async function(res:Response,msg:string,statusCode:HttpStatus, data : any) {
    return  res.status(statusCode).json({
        status:statusCode,
        msg:msg, 
        data : data
    })
}

exports.internalServerError = async function(res:Response, msg: string, statusCode:HttpStatus) {
    return res.status(statusCode).json({ 
        status:statusCode,
        msg: msg,
    })
}

exports.errorResponse = async function(res:Response, msg: string, statusCode:HttpStatus) {
    return res.status(statusCode).json({ 
        status:statusCode,
        msg: msg,
    })
}