const bcrypt = require('bcryptjs');
const validator = require('validator');
const User = require('../models/user');

module.exports = {
    createUser: async function({userInput}, req) {
        const existingUser = await User.findOne({email: userInput.email});
        const errors = [];
        if(!validator.isEmail(userInput.email)) {
            errors.push({message: 'Email is invalid.'});
        }
        if(validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 8 })) {
            errors.push({message: 'Password is too short'});
        }
        if(errors.length > 0) {
            const error = new Error('Invalid input.');
            error.data = errors;
            throw error;
        }
        if(existingUser) {
            const error = new Error('User already exists!');
            throw error;
        }
        const hashedPassword = await bcrypt.hash(userInput.password, 12);
        const user = new User({
            name: userInput.name,
            email: userInput.email,
            password: hashedPassword
        });
        const createdUser = await user.save();
        return {...createdUser._doc, _id: createdUser._id.toString()};
    }
}