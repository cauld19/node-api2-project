const express = require('express');

const router = express.Router();

const Blogs = require('../data/db');


router.post('/', (req, res) => {
    const newPost = req.body;
    console.log('in the post')

    if (!newPost.title || !newPost.contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post. "})
    } else {
        Blogs.insert(newPost)
            .then(post => {
                res.status(201).json(post);
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the user to the database" });
            })
    }
})

router.post('/:id/comments', (req, res) => {

    const commentInfo = req.body;
    commentInfo.post_id = req.params.id;

    if(!commentInfo.text) {
        res.status(400).json({errorMessage: "Please provide text for the comment. "});
    } else {
        Blogs.findById(commentInfo.post_id) 
            .then( () => {
                Blogs.insertComment(commentInfo)
                    .then(comment => {
                        res.status(201).json(comment);
                    })
                    .catch(err => {
                        res.status(404).json({ message: "The post with the specified ID does not exist." });
                    })
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the comment to the database" });
            })
        }
});

router.get('/', (req, res) => {
    Blogs.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
});

router.get('/:id', (req, res) => {
    // const userId = req.params.id;

    Blogs.findById(req.params.id)
        .then(user => {
            if (user.length > 0 ) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})

router.get('/:id/comments', (req, res) => {
    Blogs.findPostComments(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The post with the specified ID does not exist." });
        }) 
})

router.delete('/:id', (req, res) => {
    Blogs.remove(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be removed"});
        })
})

router.put('/:id', (req, res) => {

    const updateInfo = req.body;

    if (!updateInfo.title || !updateInfo.contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post. "});
    } else {
        Blogs.update(req.params.id, updateInfo)
            .then(user => {
                if(user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist"});
                }
            })
            .catch(err => {
                res.status(500).json({error: "The post information could not be modified"});
            })
    }
})

module.exports = router;
