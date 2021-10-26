import { verify, decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import adminModel from '../models/admin/admin.model';


const adminSecret = async (req: any, res: Response, next: NextFunction) => {
    try{
        const reqToken: any = req.headers && req.headers.authorization || '';
        const token = reqToken.split(' ');
            if(token && token.length  === 2) {
                const matchToken = token[1];
                const verified = verify(matchToken, config.ADMIN_JWT_SECRET);
                if(verified) {
                    if(token){
                        const decoded: any = decode(matchToken);
                        if(decoded){
                            try{
                                const adminDetails : any = await adminModel.findById(decoded._id);
                                if(adminDetails){
                                    req['tokenId'] = decoded._id;
                                    next();
                                } else{
                                    res.status(401).json({adminDetails: true})
                                }
                            } catch(err) {
                                res.status(500).json({decoded: true})
                            }
                        }
                    } else {
                        console.log(Error);
                    }
                } else {
                    console.log(Error);
                }    
        } else {
            res.status(403).json({token: "Required"});
        }
    } catch (err) {
        res.status(403).json({token: true, err});
    }
    
}

export default adminSecret;