import { Schema, model } from 'mongoose';

const userCart = new Schema({
    products: {
        type: Schema.Types.ObjectId,
        required: "Products required"
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    cartQuantity: {
        type: Schema.Types.Number,
        required: "Quantity required"
    }
},{ timestamps: true });

export default model('UserCart', userCart);