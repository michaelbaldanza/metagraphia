const Post = require('../models/post');

function create(req, res) {
  const post = new Post(req.body);
  post.save(function (err) {
    if (err) return res.render('posts/new');
    console.log(post);
    res.redirect('posts');
  });
}

function deleteOne(req, res) {
  Post.findByIdAndDelete(req.params.id, function (err, post) {
    res.redirect('../posts');
  });
}

function edit(req, res) {
  Post.findById(req.params.id, function(err, post) {
    res.render('posts/edit', { post: post });
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

function update(req, res) {
  Post.findById(req.params.id, function(err, post) {
    const field = ['title', 'source', 'link', 'author', 'text'];
    for (i = 0; i < field.length; i++) {
      post[field[i]] = req.body[field[i]];
    }
    post.save(function (err) {
      res.redirect(`../posts/${post.id}`);
    });
  });
}

module.exports = {
  create: create,
  delete: deleteOne,
  edit: edit,
  index: index,
  new: newPost,
  show: show,
  update: update,
}