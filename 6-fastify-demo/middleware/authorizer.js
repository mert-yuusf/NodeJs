// const verifyToken = async (request, response, done) => {
//     const { token } = request.headers.authorization;
//     console.log(token);

// }


// create this function in an auth folder in controllers and export it
const verifyToken = (req, reply, done) => {
    const { token } = req.headers;

    jwt.verify(token, 'my_jwt_secret', (err, decoded) => {
        if (err) {
            done(new Error('Unauthorized'));
        }

        req.user = {
            id: decoded.id, // pass in the user's info
        };
    });

    done();
};


module.exports = verifyToken;