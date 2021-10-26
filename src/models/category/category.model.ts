import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    categoryName: {
        type: Schema.Types.String,
        required: 'Category name is required',
        unique: true
    },
    imageUrl : {
        type: Schema.Types.String,
        required: 'Category image is required',
    },
    isAvailable: {
        type: Schema.Types.Boolean,
        default: true,
    }
}, { timestamps: true })

export default model('category', categorySchema);