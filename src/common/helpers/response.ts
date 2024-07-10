import {HttpStatus, Response} from "@nestjs/common"

exports.successResponse = async function(res:any,msg:string,statusCode:HttpStatus) {
    return await res.status(statusCode).json({
        status:statusCode,
        msg:msg
    })
}

exports.successResponseWithData = async function(res:any,msg:string,statusCode:HttpStatus, data : any) {
    return await res.status(statusCode).json({
        status:statusCode,
        msg:msg, 
        data : data
    })
}

exports.internalServerError = async function(res:any, msg: string, statusCode:HttpStatus) {
    return await res.status(statusCode).json({ 
        status:statusCode,
        msg: msg,
    })
}

exports.errorResponse = async function(res:any, msg: string, statusCode:HttpStatus) {
    return await res.status(statusCode).json({ 
        status:statusCode,
        msg: msg,
    })
}