const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(
            req.body, {
                where: {
                    id: req.params.id
                },
            });
        
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });

        if (!postData) {
            res.status(400).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add comment
router.post('/:id/comment', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            content: req.body.content
        })

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update comment
router.put('/:id/comment/:commentId', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            {
                content: req.body.content
            },
            {
                where: {
                    id: req.params.commentId
                }
            }
        );
        res.status(200).json(updatedComment)
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete comment
router.delete('/:id/comment/:commentId', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.commentId
            }
        });

        if (!commentData) {
            res.status(404).json({
                message: "No comments found with that id!"
            });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;