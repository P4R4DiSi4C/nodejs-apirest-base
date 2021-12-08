module.exports = {
    /**
     * create our 404 not found error incase a route is not found
     */
    not_found: (req, res, next) => {
        const error = new Error();

        error.message = 'not found';
        error.status  = global.status.NOT_FOUND;

        next(error);
    },
    /**
     * handle errors and show them incase we are in a dev environment
     */
    error_handler: (err, req, res, next) => {
        const message = global.env === 'dev' ? err.message : 'error';
        const status  = err.status || global.status.ERROR;

        res.status(status).json({ msg: message });
    }
}