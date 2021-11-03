// Third-party modules
const User = require('./../models/User.js');
const bcrypt = require('bcrypt');

// Local modules
const { jwtSign } = require('../helpers/jwtHelper.js');

const register = (userInput) => {
    // TODO: Change the variable parameter depends on the model requirements.
    return findByUsername(userInput.username)
        .then(user => {
            if (user) {
                throw new Error ('This username is already taken.');
            }
            return bcrypt.hash(userInput.password, 10)
        })
        .then(hash => {
            return User.create({username: userInput.username, hashedPassword: hash});
        })
        .catch(err => {
            // TODO: Error handler
            console.log('Register Service error', err.message);
        });
}

const login = (userInput) => {
    return findByUsername(userInput.username)
        .then(user => {
            if (!user) {
                throw new Error ('Incorrect username or password');
            }
            return Promise.all([bcrypt.compare(userInput.password, user.hashedPassword), user]);
        });
}

const createToken = (userData, secret) => {
    let payload = {
        username: userData.username,
        _id: userData._id,
    };

    return jwtSign(payload, secret);
}

const findByUsername = (username) => {
    // TODO: Change the variable depend on model requirements
    return User.findOne({username});
}

const authService = {
    register,
    login,
    createToken,
    findByUsername,
}

module.exports = authService;