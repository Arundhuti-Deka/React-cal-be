"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userCart = new mongoose_1.Schema({
    products: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: "Products required"
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    cartQuantity: {
        type: mongoose_1.Schema.Types.Number,
        required: "Quantity required"
    }
}, { timestamps: true });
exports.default = mongoose_1.model('UserCart', userCart);
//# sourceMappingURL=userCart.model.js.map