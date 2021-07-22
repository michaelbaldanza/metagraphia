const Post = require('../models/post');

// options for toLocale___String()
const options = {
  date: {
    year: 'numeric',
    month:'long',
    day: 'numeric',
  },
  time: {
    hour: '2-digit',
    minute: '2-digit',
  },
}

function create(req, res) {
  const post = new Post(req.body);
  let tags = req.body['tags'].split(',');
  post['tags'] = tags;
  // the following lines, including the for loop, address the automatic
  // inclusion of '\r' at the end of each array item prevent the creation of
  // surplus <p> elements.
  let paragraphs = req.body['text'].split('\n');
  let paras = [];
  for (i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i] === '\r') {
      paragraphs.splice(i, 1);
    }
    let splcIdx = paragraphs[i].indexOf('\r');
    let myText = paragraphs[i].slice(0, splcIdx);
    paras.push(myText);
    console.log(paragraphs[i]);
    console.log(splcIdx);
  }
  post['text'] = paras;
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
    console.log(post);
    res.render('posts/edit', { post: post });
  });
}

function index(req, res) {
  Post.find({}, function(err, posts) {
    res.render('posts/index', { posts: posts, date: options.date });
  });
}

function newPost(req, res) {
  res.render('posts/new');
}

function show(req, res) {
  Post.findById(req.params.id, function(err, post) {
    let myTimeString = post.createdAt.toLocaleTimeString([], options.time);
    let displayTime = '';
    if (myTimeString[0] === '0') {
      displayTime = myTimeString.slice(1);
    } else {
      displayTime = myTimeString;
    }
    res.render('posts/show', { post: post, date: options.date, time: displayTime });
  });
}

function update(req, res) {
  Post.findById(req.params.id, function(err, post) {
    const field = [
      'title', 'source', 'link', 'author', 'pubYear', 'text'
    ];
    let tags = req.body['tags'].split(',');
    for (i = 0; i < field.length; i++) {
      post[field[i]] = req.body[field[i]];
    }
    post['tags'] = tags;
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