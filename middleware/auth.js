const user_model = require('../model/user');
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');

module.exports = {
    login: async (req, res, next) => {
        try {
            let { email, password } = req.body;
            
            // prevent it from failing cuz of uppercases
            email = email.toLowerCase();

            const user = await user_model.findOne({ email });

            if(!user)
                return res.status(global.status.ERROR).json({msg : 'User not found'})
            
            if(!await bcrypt.compare(password, user.password))
                return res.status(global.status.UNAUTHORIZED).json({msg : 'Wrong password'})
            
            req.body.user = user; 

            next();
        } catch(e) {
            next(e);
        }
    },

    is_logged: async (req, res, next) => {
        try {
            const token = req.headers.auth;

            // verify will automatically stop our middleware and give a response else it will return decoded token
            req.body.auth = jwt.verify(token, process.env.JWT_SECRET);

            const user = await user_model.findById(req.body.auth.id);

            if(!user)
                return res.status(global.status.UNAUTHORIZED).json({msg : 'you are not logged in'})

            req.body.user = user;

            next();
        } catch(e) {
            next(e);
        }
    }
}