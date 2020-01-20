const express = require('express');

const router = express.Router();

const Blogs = require('../data/db');



// router.get('/', (req, res) => {
//     Blogs.find()
//     .then(posts => {
//         res.status(200).json(posts);
//     })
//     .catch(err => {
//         err.status(500).json({ error: "The users information could not be retrieved." })
//     })
// })

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

module.exports = router;