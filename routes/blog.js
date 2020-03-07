const User = require('../models/user'); 
const Blog = require('../models/blog'); 
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

  router.post('/newBlog', (req, res) => {
   
      if (!req.body.body) {
        res.json({ success: false, message: 'Blog body is required.' });
      }
        if (!req.body.createdBy) {
          res.json({ success: false, message: 'Blog creator is required.' });
        } 
          const blog = new Blog({
            body: req.body.body, 
            createdBy: req.body.createdBy 
          });
          blog.save((err) => {
            if (err) {
              if (err.errors) {
       
                  if (err.errors.body) {
                    res.json({ success: false, message: err.errors.body.message }); 
                  } 
                    res.json({ success: false, message: err }); 
                  
                
              } 
                res.json({ success: false, message: err }); 
              }
            
              res.json({ success: true, message: 'Blog saved!' }); 
            
          });
        
      
    
  });


  router.get('/allBlogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
      if (err) {
        res.json({ success: false, message: err }); 
      } 
        if (!blogs) {
          res.json({ success: false, message: 'No blogs found.' });
        }
          res.json({ success: true, blogs: blogs });

    }).sort({ '_id': -1 }); 
  });


  router.get('/singleBlog/:id', (req, res) => {
    if (!req.params.id) {
      res.json({ success: false, message: 'No blog ID was provided.'});
    } 
    Blog.findOne({ _id: req.params.id}, (err, blog) => {
      if(err) {
        res.json({ success: false, message: 'Not a valid blog id'});
      }  
        User.findOne({ _id: req.user}, (err, user) => {
              if (err) {
                res.json({ success: false, message: err }); 
              }
     
                res.json({ success: true, blog: blog }); 
              });
            });
          });


  router.put('/updateBlog', (req, res) => {
    if (!req.body._id) {
      res.json({ success: false, message: 'No blog id provided' }); 
    }
    Blog.findOne({ _id: req.body._id }, (err, blog) => {
        if (err) {
          res.json({ success: false, message: 'Not a valid blog id' }); 
        }
        if (!blog) {
          res.json({ success: false, message: 'Blog id was not found.' }); 
        };
        User.findOne({ _id: req.user }, (err, user) => {

          blog.body = req.body.body; 
          blog.save((err) => {
            if (err) {
              if (err.errors) {
                res.json({ success: false, message: 'Please ensure form is filled out properly' });
              } else {
                res.json({ success: false, message: err }); 
              }
            }
            res.json({ success: true, message: 'Blog Updated!' });
          });
        })
      })
  });


  router.delete('/deleteBlog/:id', (req, res) => {
    if (!req.params.id) {
      res.json({ success: false, message: 'No id provided' });
    }
      Blog.findOne({ _id: req.params.id }, (err, blog) => {
        if (err) {
          res.json({ success: false, message: 'Invalid id' }); 
        } 
                    blog.remove((err) => {
                      if (err) {
                        res.json({ success: false, message: err }); 
                      } 
                        res.json({ success: true, message: 'Blog deleted!' });
                    
                    });
                  
                
              
            });
          
        
    
    
  });

  router.post('/comment', (req, res) => {
    if (!req.body.comment) {
      res.json({ success: false, message: 'No comment provided' });
    } 
      if (!req.body.id) {
        res.json({ success: false, message: 'No id was provided' }); 
      } 
        Blog.findOne({ _id: req.body.id }, (err, blog) => {
          if (err) {
            res.json({ success: false, message: 'Invalid blog id' });
          } 
            if (!blog) {
              res.json({ success: false, message: 'Blog not found.' }); 
            }
                    blog.comments.push({
                      comment: req.body.comment, 
                      //commentator: user.username 
                    });
                    blog.save((err) => {
                      if (err) {
                        res.json({ success: false, message: 'Something went wrong.' }); 
                      } 
                        res.json({ success: true, message: 'Comment saved' }); 
                      
                    });
                  
         
    
         
        });
   
  });

     

  return router;
};
