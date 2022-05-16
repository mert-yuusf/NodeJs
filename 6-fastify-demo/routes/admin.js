const {
    getAllAdminsSchema,
    getOneAdminSchema,
    registerAdminSchema,
    loginAdminSchema,
} = require('../controllers/schemas/admin');


const {
    getAllAdminsHandler,
    getOneAdminHandler,
    registerAdminHandler,
    loginAdminHandler
} = require('../controllers/handlers/admin');

const getAllAdmins = {
    schema: getAllAdminsSchema,
    handler: getAllAdminsHandler
}


const getOneAdmin = {
    schema: getOneAdminSchema,
    handler: getOneAdminHandler
}

const registerAdmin = {
    schema: registerAdminSchema,
    handler: registerAdminHandler
}


const loginAdmin = {
    schema: loginAdminSchema,
    handler: loginAdminHandler
}



const adminRoutes = (fastify, options, done) => {
    fastify.get('/api/admins', { preHandler: fastify.auth([verifyToken]) }, getAllAdmins);
    fastify.post('/api/register', registerAdmin);
    fastify.post('/api/login', loginAdmin);
    fastify.get('/api/admins/:id', getOneAdmin)
    done();
}

module.exports = adminRoutes;