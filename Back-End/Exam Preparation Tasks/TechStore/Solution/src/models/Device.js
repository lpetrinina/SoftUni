import { Schema, Types, model } from "mongoose";


const deviceSchema = new Schema({
    brand: {
        type: String,
        required: [true, 'Brand is required!'],
        minLength: [2, 'Brand should be at least 2 characters long!']
    },
    model: {
        type: String,
        required: [true, 'Model is required!'],
        minLength: [5, 'Model should be at least 5 characters long!']
    },
    hardDisk: {
        type: String,
        required: [true, 'Hard Disk is required!'],
        minLength: [5, 'Hard Disk should be at least 5 characters long!']
    },
    screenSize: {
        type: String,
        required: [true, 'Screen Size is required!'],
        minLength: [1, 'Screen Size  should be at least 1 characters long!']
    },
    ram: {
        type: String,
        required: [true, 'RAM is required!'],
        minLength: [2, 'RAMe  should be at least 2 characters long!']
    },
    operatingSystem: {
        type: String,
        required: [true, 'Operating System is required!'],
        minLength: [5, 'Operating System should be at least 5 characters long!'],
        maxLength: [20, 'Operating System be max 20 characters long!']
    },
    cpu: {
        type: String,
        required: [true, 'CPU is required!'],
        minLength: [10, 'CPU should be at least 10 characters long!'],
        maxLength: [50, 'CPU be max 50 characters long!']
    },
    gpu: {
        type: String,
        required: [true, 'GPU is required!'],
        minLength: [10, 'GPU should be at least 10 characters long!'],
        maxLength: [50, 'GPU be max 50 characters long!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'Price should be positive number!']
    },
    color: {
        type: String,
        required: [true, 'Color is required!'],
        minLength: [2, 'Color should be at least 2 characters long!'],
        maxLength: [10, 'Color be max 10 characters long!']
    },
    weight: {
        type: String,
        required: [true, 'Weight is required!'],
        minLength: [1, 'Weight should be at least 1 characters long!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required!'],
        match: /^https?:\/\//,
    },
    preferredList: [{ //a collection of Users (a reference to the User model)
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: { //object ID (a reference to the User model
        type: Types.ObjectId,
        ref: 'User'
    },

});


const Device = model('Device', deviceSchema);

export default Device;