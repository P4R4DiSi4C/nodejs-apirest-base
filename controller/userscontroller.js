const jwt        = require('jsonwebtoken');
const user_model = require('../model/user');

module.exports = {
    register: async (req, res, next) => {
        const { firstname, lastname, email, password, role } = req.body;

        try {
            const existing_user = await user_model.findOne({ email });

            if(role == undefined)
                return res.status(global.status.ERROR).json({ msg: 'an error occured' });

            if(existing_user)
                return res.status(global.status.ERROR).json({ msg: 'user already exist' });

            const r = await new user_model({ firstname: firstname, lastname: lastname, email: email, password: password, role: role }).save();
            
            return res.status(global.status.CREATED).json({ msg: 'user created' });
        } catch (e) {
            next(e);
        }
    },
    login: async (req, res, next) => {
        try {
            const user = req.body.user;
            const token = jwt.sign({ id : user._id }, process.env.JWT_SECRET, { expiresIn : '24h' });

            res.status(global.status.OK).json({ msg: 'successfully logged', auth: token });
        } catch(e) {
            next(e);
        }
    },
    account: async (req, res, next) => {
        const user = req.body.user;

        res.status(global.status.OK).json({ msg: 'your profile', profile: { firstname: user.firstname, lastname: user.lastname, email: user.email } });
    },
    update_account: async (req, res, next) => {
        try{
            const updated_user = await user_model.findByIdAndUpdate(req.body.user._id, req.body.updated_user, { new: true });

            if(!updated_user)
                res.status(global.status.NO_CONTENT).json({ msg: 'couldn\'t update' });

            res.status(global.status.OK).json({ msg: 'your updated profile', profile: { firstname: updated_user.firstname, lastname: updated_user.lastname, email: updated_user.email } });
        } catch(e) {
            next(e);
        }
    }
}

