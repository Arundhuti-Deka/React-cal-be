import { Router, Request, Response } from 'express';
class HealthCheckRouter {
    public router: Router = Router();

    constructor(){
        this.initializeRouter()
    }
    private initializeRouter():void {
        this.router.get('/healthcheck', (req: Request, res: Response) => {
            res.status(200).json({health: 'ecommerce api up on running'})
        })
    }
}

export default HealthCheckRouter;