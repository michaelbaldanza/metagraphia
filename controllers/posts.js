const Post = require('../models/post');

function create(req, res) {
  const post = new Post(req.body);
  post.save(function (err) {
    if (err) return res.render('posts/new');
    console.log(post);
    res.redirect('posts');
  });
}

function index(req, res) {
  Post.find({}, function(err, posts) {
    res.render('posts/index', { posts: posts});
  });
}

function newPost(req, res) {
  res.render('posts/new');
}

function show(req, res) {
  Post.findById(req.params.id, function(err, post) {
    res.render('posts/show', { post: post });
  });
}

module.exports = {
  create: create,
  index: index,
  new: newPost,
  show: show,
}