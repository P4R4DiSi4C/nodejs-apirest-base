const router           = require('express').Router();
const users_controller = require('../controller/userscontroller');

module.exports = (auth_middleware) => {
    router.route('/register')
        .post(users_controller.register);

    router.route('/login')
        .post(auth_middleware.login, users_controller.login);

    router.route('/account')
        .get(auth_middleware.is_logged, users_controller.account)
        .patch(auth_middleware.is_logged, users_controller.update_account)

    return router;
}