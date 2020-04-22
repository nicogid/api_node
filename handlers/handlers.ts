import { Response, Request } from "express"
var util = require("./../util/util");

const jwt = require('jsonwebtoken')

const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 300


const signIn = (req: Request, res: Response) => {
    // Get credentials from JSON body
    const { username, password } = req.body

    console.log(req.body);
    
    if (!username || !password) {
        // return 401 error is username or password doesn't exist, or if password does
        // not match the password in our records
        return res.status(401).end()
    }

    // Create a new token with the username in the payload
    // and which expires 300 seconds after issue
    const token = jwt.sign({ username }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    })
    console.log('token:', token)

    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds, so we multiply by 1000
    res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
    res.end()
}

const welcome = (req: Request, res: Response) => {
    // We can obtain the session token from the requests cookies, which come with every request
    
    const { err, status } = util.isAuthenticated(req,res);
    if(status != null && !err)
        return res.status(status).end();
    // Finally, return the welcome message to the user, along with their
    // username given in the token
    res.send(`Welcome !`).status(200);
}

const refresh = (req: Request, res: Response) => {
    // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
    const token = req.cookies.token

    if (!token) {
        return res.status(401).end()
    }

    var payload
    try {
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end()
        }
        return res.status(400).end()
    }
    // (END) The code uptil this point is the same as the first part of the `welcome` route

    // We ensure that a new token is not issued until enough time has elapsed
    // In this case, a new token will only be issued if the old token is within
    // 30 seconds of expiry. Otherwise, return a bad request status
    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (payload.exp - nowUnixSeconds > 30) {
        return res.status(400).end()
    }

    // Now, create a new token for the current user, with a renewed expiration time
    const newToken = jwt.sign({ username: payload.username }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    })

    // Set the new token as the users `token` cookie
    res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
    res.end()
};

export = {
    signIn,
    welcome,
    refresh
}

