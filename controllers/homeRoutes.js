const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET All blog posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

// GET single blog post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

// GET profile
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userId, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }]
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            loggedIn: true
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

// login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
})

module.exports = router;