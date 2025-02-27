import { Schema, model, Types } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters long!'],
    },
    skin: {
        type: String,
        required: [true, 'Skin is required!'],
        minLength: [10, 'Skin should be at least 10 characters long!'],
        maxLength: [100, 'Skin should be max 100 characters long!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [20, 'Description should be at least 20 characters long!'],
        maxLength: [200, 'Description should be max 200 characters long!']
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients are required!'],
        minLength: [2, 'Ingredients should be at least 2 characters long!'],
        maxLength: [50, 'Ingredients should be max 50 characters long!']
    },
    benefits: {
        type: String,
        required: [true, 'Benefits are required!'],
        minLength: [10, 'Benefits should be at least 10 characters long!'],
        maxLength: [100, 'Benefits should be max 100 characters long!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'Price should be positive number!']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: /^https?:\/\//,
    },
    recommendList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

const Product = model('Product', productSchema);

export default Product;