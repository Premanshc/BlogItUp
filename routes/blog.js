const express = require('express');
const multer = require('multer');
const Blog = require('../models/blog');
const Comment = require('../models/comment');


const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    }
  })

  const upload = multer({ storage: storage })

router.get('/add-new', (req, res) => {
    return res.render('addBlog',{
        user: req.user,
    });
});

router.get('/:id', async (req, res)=>{
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({blogId: req.params.id}).populate('createdBy');
    return res.render('blog',{
        user: req.user,
        blog,
        comments
    });
})

router.post('/comment/:blogId', async (req, res)=>{
    const content = req.body.content;
    const blogId = req.params.blogId;
    const createdBy = req.user.id;
    await Comment.create({
        content: content,
        blogId: blogId,
        createdBy: createdBy,
    });

    return res.redirect(`/blog/${req.params.blogId}`);
})

router.post('/add-new', upload.single("coverImage"), async (req, res)=>{
    const { title, body } = req.body;
    let blog;
    if(!req.file){
        blog = await Blog.create({
            title, 
            body, 
            createdBy: req.user.id,
        });
    }else{
        blog = await Blog.create({
            title, 
            body, 
            coverImageURL: `/uploads/${req.file.filename}`,
            createdBy: req.user.id,
        });
    }
    
    
    return res.redirect(`/blog/${blog._id}`);
})



module.exports = router;