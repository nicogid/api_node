import { Request, Response } from "express";

const jwt = require('jsonwebtoken')

const jwtKey = 'my_secret_key'

export function isAuthenticated(req: Request, res: Response){
   
    const token = req.cookies.token

    // if the cookie is not set, return an unauthorized error
    if (!token) {
        return {
            err : false,
            status : 401
        };
    }
    try {
        jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            return {
                err: false,
                status : 401
            };
        }
        // otherwise, return a bad request error
        return {
            err: false,
            status: 400
        };
    }
    return {
        err: false,
        status: null
    };
}