import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

//  TODO: Modify User schema


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email should be at least 10 characters long!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [2, 'Name should be at least 2 characters long!'],
        maxLength: [20, 'Name should be max 20 characters long!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password should be at least 4 characters long!'],
    },
});

// Hash plain password before save it on database
userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;

