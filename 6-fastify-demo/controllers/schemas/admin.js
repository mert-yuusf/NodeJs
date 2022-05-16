const typeString = { type: 'string' };

const admin = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        username: typeString,
        email: typeString,
    }
}


const getAllAdminsSchema = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    _id: typeString,
                    username: typeString,
                    email: typeString,
                }
            }
        }
    }
}


const getOneAdminSchema = {
    response: {
        200: admin
    }
}

const registerAdminSchema = {
    body: {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
            username: typeString,
            email: typeString,
            password: typeString
        }
    },

    response: {
        200: typeString
    }
}


const loginAdminSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: typeString,
            password: typeString
        }
    },


    response: {
        200: {
            type: 'object',
            properties: {
                token: typeString
            }
        }
    }
}

module.exports = {
    getAllAdminsSchema,
    getOneAdminSchema,
    registerAdminSchema,
    loginAdminSchema
}