import { Router } from 'express';
import AdminController from '../controllers/admin/admin.controller';
import CategoryController from '../controllers/category/categorys.controller';
import adminSecret from '../utils/admin.verify';
class AdminRouter {
    public router: Router = Router();
    private adminController : AdminController = new AdminController();
    private categoryController: CategoryController = new CategoryController();

    constructor(){
        this.initializeRouter();
    }

    private initializeRouter(){
        this.router.post('/addAdmin', this.adminController.createAdmin);
        this.router.post('/authenticate', this.adminController.authenticate);
        this.router.post('/changePassword', adminSecret,this.adminController.changePassword);
        this.router.get('/adminCheck', adminSecret,this.adminController.adminCheck);
        this.router.get('/adminProfile', adminSecret,this.adminController.adminProfile)
        // customers
        this.router.get('/allUsers', adminSecret,this.adminController.allUsers)
        this.router.get('/getUserById/:userId', adminSecret,this.adminController.getUserById);
        this.router.put('/userEnable', adminSecret,this.adminController.userEnable)

        // category
        
    }
}

export default AdminRouter;