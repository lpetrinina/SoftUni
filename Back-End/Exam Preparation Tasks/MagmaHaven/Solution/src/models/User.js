import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

//  TODO: Modify User schema


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: 2
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: 10
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: 4
    },
});

// Hash plain password before save it on database
userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;

