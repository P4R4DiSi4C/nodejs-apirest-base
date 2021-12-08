const file_model = require('../model/file');

module.exports = {
    upload: async (req, res, next) => {
        try {
            const image = req.files.image;
            const user  = req.body.user;

            // include file buffer into db
            const file = await file_model.findByIdAndUpdate(user.avatar, { data: image.data }, { new: true })

            res.status(global.status.OK).json({ msg: 'file upload successfully', file : { id: file._id }});
        } catch(e) {
            next(e);
        }
    },

    get: async (req, res, next) => {
        try {
            const file = await file_model.findById(req.params.id);

            if(!file)
                return res.status(global.status.ERROR).json({msg : 'an error occured'});

            // render file from buffer
            res.status(global.status.OK).end(file.data);
        } catch(e) {
            next(e);
        }
    }
}