"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../../config"));
const category_model_1 = __importDefault(require("../../models/category/category.model"));
const product_model_1 = __importDefault(require("../../models/category/product.model"));
const admin_model_1 = __importDefault(require("../../models/admin/admin.model"));
class CategoryController {
    constructor() {
        this.createToken = (category) => {
            const expiresIn = 60 * 60;
            const dataStoredInToken = {
                _id: category._id,
                time: category["lastLoggedIn"],
                isAdmin: true
            };
            return jsonwebtoken_1.sign(dataStoredInToken, config_1.default.ADMIN_JWT_SECRET, { expiresIn });
        };
        this.createCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield admin_model_1.default.findById(req['tokenId']);
                if (user) {
                    const category = yield category_model_1.default.findOne({ categoryName: req.body.categoryName });
                    if (!category) {
                        const categoryNew = yield category_model_1.default.create(req.body);
                        if (categoryNew) {
                            res.status(201).json("Done");
                        }
                        else {
                            res.status(404).json({ message: "Something went wrong" });
                        }
                    }
                    else {
                        res.status(404).json({ categoryName: true });
                    }
                }
                else {
                    res.status(404).json({ tokenId: true });
                    console.log(Error);
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
        this.allCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = yield category_model_1.default.find({});
            if (category) {
                res.status(200).json(category);
                console.log(category);
            }
            else {
                res.status(404).json({ category: true });
            }
        });
        this.categoryProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryProducts = yield product_model_1.default.find({ categoryId: req.params._id })
                    .select(`productName 
                        description 
                        brand 
                        color 
                        price 
                        images 
                        countInStock 
                        manufacture
                `);
                if (categoryProducts) {
                    res.status(200).json(categoryProducts);
                    console.log(categoryProducts);
                }
                else {
                    res.status(404).json({ categoryId: true });
                }
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        this.addProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield admin_model_1.default.findById(req['tokenId']);
                if (user) {
                    let categoryId = yield category_model_1.default.findById(req.body["categoryId"]);
                    if (categoryId) {
                        let product = yield product_model_1.default.findOne({ productName: req.body.productName });
                        if (product) {
                            res.status(404).send({ productName: true });
                        }
                        else {
                            let product = new product_model_1.default(req.body);
                            const products = yield product.save();
                            if (products) {
                                res.status(201).json("done");
                            }
                            else {
                                res.status(409).json({ Error: "Something went wrong" });
                            }
                        }
                    }
                    else {
                        res.status(404).send({ categoryId: "Not Found" });
                    }
                }
                else {
                    res.status(404).json({ tokenId: true });
                    console.log(Error);
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getProductById = yield product_model_1.default.findById({ _id: req.params._id })
                    .select(`productName 
                    description 
                    brand 
                    color 
                    price 
                    images 
                    countInStock 
                    manufacture
                `);
                if (getProductById) {
                    res.status(200).json(getProductById);
                    console.log(getProductById);
                }
                else {
                    res.status(404).json({ productId: true });
                }
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        this.editProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield admin_model_1.default.findById(req['tokenId']);
                console.log(admin);
                if (admin) {
                    const update = yield product_model_1.default.findByIdAndUpdate({ _id: req.params._id }, { $set: Object.assign({}, req.body) }, { new: true });
                    console.log(update);
                    if (update) {
                        res.status(200).json("Done");
                    }
                    else {
                        res.status(404).json({ update: true });
                        console.log(Error);
                    }
                }
                else {
                    res.status(401).json({ tokenId: true });
                }
            }
            catch (err) {
                res.status(500).json(err);
                console.log(Error);
            }
        });
        this.allProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield product_model_1.default.find({});
                if (category) {
                    res.status(200).json(category);
                    console.log(category);
                }
                else {
                    res.status(404).json({ category: true });
                }
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        this.productStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_model_1.default.findById(req['tokenId']);
            if (admin) {
                try {
                    const categoryId = yield product_model_1.default.find({ _id: req.params._id, isAvailable: true });
                    if (categoryId) {
                        let updateCategoryStatus = yield product_model_1.default.updateOne({ _id: req.params._id }, { $set: { isAvailable: req.body.isAvailable } }, { new: true });
                        console.log(updateCategoryStatus);
                        if (updateCategoryStatus) {
                            res.status(200).json("Done");
                        }
                        else {
                            res.status(400).json("something wrong");
                        }
                    }
                    else {
                        res.status(401).json({ isAvailable: false });
                    }
                }
                catch (err) {
                    res.status(500).json(err);
                }
            }
            else {
                res.status(401).json({ admin: true });
            }
        });
    }
}
exports.default = CategoryController;
//# sourceMappingURL=categorys.controller.js.map