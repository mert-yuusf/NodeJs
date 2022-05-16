const posts = require('../../cloud/posts')

const getAllPostsHandler = (request, replay) => {
    replay.send(posts);
}


const getOnePostHandler = (request, replay) => {
    const { id } = request.params;
    const post = posts.filter((p) => {
        return p.id === id;
    })[0];

    if (!post) {
        return replay.status(404).send(
            new Error('Post not found')
        )
    }
    replay.send(post);
}


const createPostHandler = (request, replay) => {
    const { title, body } = request.body;
    const id = posts.length + 1;
    posts.push({ id, title, body });
    replay.send('Post is created');
}


const putOnePostHandler = (request, replay) => {
    const { id } = request.params;
    const { title, body } = request.body;

    const post = posts.filter((p) => {
        return p.id === id;
    })[0];

    if (!post) {
        replay.status(404).send(new Error(
            'Post not found'
        ));

        return;
    };

    post.title = title;
    post.body = body;

    return replay.send('Post updated');
}


const deleteOnePostHandler = (request, replay) => {
    const { id } = request.params;

    const post = posts.filter((p) => {
        return p.id === id;
    })[0];



    if (!post) {
        replay.status(404).send(new Error(
            'Post not found'
        ));
        return;
    };

    const selectedPost = posts.find((p) => {
        return p.id === id;
    })

    posts.splice(selectedPost, 1);


    replay.send('Post has deleted')
}

module.exports = {
    getAllPostsHandler,
    getOnePostHandler,
    createPostHandler,
    putOnePostHandler,
    deleteOnePostHandler,
};