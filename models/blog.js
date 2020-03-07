
const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise; 
const Schema = mongoose.Schema; 

let bodyLengthChecker = (body) => {
  if (!body) {
    return false; 
  } else {
    if (body.length > 140) {
      return false; 
    } else {
      return true;
    }
  }
};

const bodyValidators = [
  {
    validator: bodyLengthChecker,
    message: 'Body must be more than 5 characters but no more than 500.'
  }
];

let commentLengthChecker = (comment) => {
  if (!comment[0]) {
    return false; 
  } else {
    if (comment[0].length < 1 || comment[0].length > 140) {
      return false; 
    } else {
      return true; 
    }
  }
};

const commentValidators = [
  {
    validator: commentLengthChecker,
    message: 'Comments may not exceed 200 characters.'
  }
];

const blogSchema = new Schema({
  body: { type: String, required: true, validate: bodyValidators },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  likedBy: { type: Array },
  comments: [{
    comment: { type: String, validate: commentValidators },
    commentator: { type: String }
  }]
});

module.exports = mongoose.model('Blog', blogSchema);