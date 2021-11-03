const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// TODO: Change the user model depends on the project requirements.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        validate: [/^[a-zA-Z0-9]+$/, 'Username should have only english letters and digits'],
    },
    hashedPassword: {
        type: String,
        required: true,
        minlength: 10,
    },
});


const User = mongoose.model('User', userSchema);

module.exports = User;