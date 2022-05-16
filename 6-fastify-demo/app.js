const fastify = require('fastify')({
    logger: true
});
// setup mongodb
const connectDb = require('./db/connect');



fastify.get('/', (request, replay) => {
    replay.send('Hello World')
});

const PORT = 5000;


// add plugins
fastify.register(
    require('./routes/post')
)

fastify.register(
    require('./routes/admin')
);


const startServer = async () => {
    try {
        await connectDb();
        await fastify.listen(PORT);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};


startServer();