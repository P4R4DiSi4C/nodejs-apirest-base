const bcrypt   = require('bcrypt');
const mongoose = require('mongoose');
const schema   = mongoose.Schema;

const user = new schema({
    firstname: String,
    lastname : String,
    email    : String,
    password : String,
    role     : Number,
    created  : { type: Date, default: Date.now }
});

user.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);

    next();
});

const model = mongoose.model('user', user);

module.exports = model;