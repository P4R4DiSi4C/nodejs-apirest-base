const mongoose = require('mongoose');
const schema   = mongoose.Schema;

const file = new schema({
    data: Buffer
});

const model = mongoose.model('file', file);

module.exports = model;