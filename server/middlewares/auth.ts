import {Request, Response, NextFunction, json} from 'express'
import{ auth } from '../lib/auth.js'
import {fromNodeHeaders } from 'better-auth/node'

export const protect = async (req: Request, res: Response, next: NextFunction) => {

try{

const session = await auth.api.getSession({

    headers: fromNodeHeaders(req.headers)
})
    if(!session || !session?.user)
      return res.status(401).json({ message: 'Unauthorized user'})

req.userId = session.user.id;
next();
}

catch(error: any){
    return res.status(500).json({ message: error.message || 'Internal Server Error'})
}
}