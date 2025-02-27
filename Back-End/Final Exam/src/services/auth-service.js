import bcrypt from 'bcrypt';

import User from '../models/User.js';
import { generateToken } from '../utils/auth-utils.js';



const login = async (email, password) => {

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password!');
    };

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password!');
    };

    const token = generateToken(user);

    return token;

};



const register = async (userData) => {

    if (userData.password !== userData.confirmPassword) {
        throw new Error('Password mismatch!');
    };

    const user = await User.findOne({ email: userData.email }).select({ _id: true });
    if (user) {
        throw new Error('User already exists!')
    };

    const createrdUser = await User.create(userData);

    const token = generateToken(createrdUser);

    return token;
};




const authService = {
    register,
    login
};

export default authService;