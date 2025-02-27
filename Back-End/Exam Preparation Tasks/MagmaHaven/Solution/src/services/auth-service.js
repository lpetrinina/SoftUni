import bcrypt from 'bcrypt';

import User from '../models/User.js';
import { generateToken } from '../utils/auth-utils.js';



const login = async (email, password) => {

    const user = await User.findOne({ email }); //Check if user with that email exists in database
    if (!user) {
        throw new Error('Invalid email or password!');
    };

    const isValid = await bcrypt.compare(password, user.password); //Check if current password is equals to the hashed password
    if (!isValid) {
        throw new Error('Invalid email or password!');
    };

    const token = generateToken(user);

    return token;

};



const register = async (userData) => {

    if (userData.password !== userData.confirmPassword) { // Check if password is equal to confirm password
        throw new Error('Password mismatch!');
    };

    const user = await User.findOne({ email: userData.email }).select({ _id: true }); // Check if user exists
    if (user) {
        throw new Error('User already exists!')
    };

    const createrdUser = await User.create(userData); // Create user (that refers to the User model) in database

    const token = generateToken(createrdUser); //Generate token for auto login after register

    return token;
};




const authService = {
    register,
    login
};

export default authService;