const typeString = { type: 'string' };


const post = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: typeString,
        body: typeString,
    }
};

const getAllPostsSchema = {
    response: {
        200: {
            type: 'array',
            items: post,
        }
    }
}


const getOnePostSchema = {
    params: {
        id: { type: 'number' }
    },

    response: {
        200: post
    }
}

const createPostSchema = {
    body: {
        type: 'object',
        required: ['title', 'body'],
        properties: {
            title: typeString,
            body: typeString
        }
    },

    response: {
        200: typeString  // we will send simple message
    }
}


const putOnePostSchema = {
    body: {
        type: 'object',
        required: ['title', 'body'],
        properties: {
            title: typeString,
            body: typeString
        }
    },

    params: {
        id: { type: 'number' }
    },

    response: {
        200: typeString
    }
}


const deleteOnePostSchema = {
    params: {
        id: { type: 'number' }
    },

    response: {
        200: typeString  // we will send simple message
    }
}

module.exports = {
    getAllPostsSchema,
    getOnePostSchema,
    createPostSchema,
    putOnePostSchema,
    deleteOnePostSchema
};