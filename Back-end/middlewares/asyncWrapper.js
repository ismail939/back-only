module.exports = (asyncFn) => {
    return (req, res, next) => {
        asyncFn(req, res, next).catch((err) => {
            err.statusCode = 400;    
            next(err);
        });
    };
};
