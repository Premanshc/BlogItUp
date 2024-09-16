const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    coverImageURL:{
        type: String,
        default: './images/defaultBlogCover.jpeg',
        required: false,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {timestamps: true});

const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;