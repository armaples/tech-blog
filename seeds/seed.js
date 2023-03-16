const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    console.log(userData)
    console.log(postData)
    console.log(commentData)
    
    await User.bulkCreate(userData);

    await Post.bulkCreate(postData);

    await Comment.bulkCreate(commentData);

    process.exit(0);
};

seedDatabase();