const mongoose = require('mongoose');

module.exports = {
    db_connect: () => {
        mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`);
        // using javascript promise cuz mongoose one are deprecated
        mongoose.Promise = global.Promise;
    }
};