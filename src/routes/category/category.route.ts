import { Router } from 'express';
import CategoryController from '../../controllers/category/categorys.controller';
import adminSecret from '../../utils/admin.verify';

class CategoryRouter {
    public router: Router = Router();
    private CategoryController : CategoryController = new CategoryController();

    constructor(){
        this.initializeRouter();
    }

    private initializeRouter(): void{
        this.router.post('/addCategory', adminSecret,this.CategoryController.createCategory);
        this.router.get('/allCategory', this.CategoryController.allCategory);
        this.router.get('/categoryProducts/:_id', this.CategoryController.categoryProducts);
        //products
        this.router.post('/addProduct', adminSecret,this.CategoryController.addProduct);
        this.router.get('/getProductById/:_id', this.CategoryController.getProductById)
        this.router.put('/productStatus/:_id', adminSecret,this.CategoryController.productStatus);
        this.router.put('/editProduct/:_id',adminSecret,this.CategoryController.editProduct);
        this.router.get('/allProducts', this.CategoryController.allProducts);

    }
}

export default CategoryRouter;