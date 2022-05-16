const {
    getAllPostsSchema,
    getOnePostSchema,
    createPostSchema,
    putOnePostSchema,
    deleteOnePostSchema
} = require('../controllers/schemas/post');


const { getAllPostsHandler,
    getOnePostHandler,
    createPostHandler,
    putOnePostHandler,
    deleteOnePostHandler
} = require('../controllers/handlers/post');

const getPostsOpts = {
    schema: getAllPostsSchema,
    handler: getAllPostsHandler,
};

const getPostOps = {
    schema: getOnePostSchema,
    handler: getOnePostHandler
}


const createOnePost = {
    schema: createPostSchema,
    handler: createPostHandler
}


const putOnePost = {
    schema: putOnePostSchema,
    handler: putOnePostHandler
}


const deleteOnePost = {
    schema: deleteOnePostSchema,
    handler: deleteOnePostHandler
}


const postRoutes = function (fastify, options, done) {
    fastify.get('/api/posts', getPostsOpts);
    fastify.get('/api/posts/:id', getPostOps);
    fastify.post('/api/posts', createOnePost);
    fastify.put('/api/posts/:id', putOnePost);
    fastify.delete('/api/posts/:id', deleteOnePost);

    fastify
        .register(require('fastify-auth'))
        .after(() => privatePostRoutes(fastify));

    done();
};





module.exports = postRoutes;