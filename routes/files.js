const router           = require('express').Router();
const files_controller = require('../controller/filescontroller');

module.exports = (auth_middleware) => {
    router.route('/upload')
        .post(auth_middleware.is_logged, files_controller.upload);

    router.route('/:id')
        .get(files_controller.get);

    return router;
}