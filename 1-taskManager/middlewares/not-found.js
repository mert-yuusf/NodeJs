const notFound = (req, res, next) => {
    try {
        next();
    } catch (err) {
        res.status(404).json({ msg: 'Route Not Found' });
    }
}

module.exports = notFound;