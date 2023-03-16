const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const posts of postData) {
        await Post.create({
            ...posts,
            userId: users[Math.floor(Math.random() * users.length)].id,
        });
    };

    for (const comments of commentData) {
        await Comment.create({
            ...comments,
            userId: users[Math.floor(Math.random() * users.length)].id,
            postId: posts[Math.floor(Math.random() * posts.length)].id,
        })
    };

    process.exit(0);
};

seedDatabase();