export const serverError = (error, req, res, next) => {
    const statusCode = req.statusCode || 500;
    res.status(statusCode).json(error);
}