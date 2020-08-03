// routes/index.js

const express = require('express');
const router = express.Router();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleCredentials = require('../config/google.json');

const mongoose = require('mongoose');
const db = mongoose.connect(
  'mongodb+srv://jisung:1234@info.v4a6r.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
const Schema = mongoose.Schema;

const Post = new Schema({
  author: String,
  picture: String,
  contents: String,
  date: Date,
  like: Number,
  comments: Array, // 댓글을 배열의 형태로 관리
});

const postModel = mongoose.model('Post', Post);

const check_user = function (req) {
  let answer;

  if (
    // 수정, 삭제시에는 로그인이 되어있어야 가능하게 만듦
    req.session.passport === undefined ||
    req.session.passport.user === undefined
  ) {
    // 비로그인유저일때
    console.log('로그인이 필요함');
    return false;
  } else {
    // 로그인 되어 있을때
    return true;
  }
};

router.use(passport.initialize());
router.use(passport.session());

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.user) {
    var name = req.user.displayName;
    var picture = req.user.photos[0].value;
    res.render('index', { name: name, picture: picture });
  } else {
    res.render('index', { name: '비로그인 유저', picture: '/images/user.png' });
  }
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/load', function (req, res, next) {
  postModel.find({}, function (err, data) {
    res.json(data);
  });
});

router.post('/write', function (req, res, next) {
  const author = req.body.author;
  const picture = req.body.picture;
  const contents = req.body.contents;
  const date = Date.now();
  const post = new postModel();

  post.author = author;
  post.picture = picture;
  post.contents = contents;
  post.date = date;
  post.like = 0;
  post.comments = [];
  post.save(function (err) {
    if (err) {
      throw err;
    } else {
      res.json({ status: 'SUCCESS' });
    }
  });
});

router.post('/like', function (req, res, next) {
  const _id = req.body._id;
  const contents = req.body.contents;
  postModel.findOne({ _id: _id }, function (err, post) {
    if (err) {
      throw err;
    } else {
      post.like++;

      post.save(function (err) {
        if (err) {
          throw err;
        } else {
          res.json({ status: 'SUCCESS' });
        }
      });
    }
  });
});

router.post('/del', function (req, res, next) {
  const _id = req.body._id;

  if (check_user(req)) {
    postModel.deleteOne({ _id: _id }, function (err, result) {
      if (err) {
        throw err;
      } else {
        res.json({ status: 'SUCCESS' });
      }
    });
  }
});

router.post('/modify', function (req, res, next) {
  const _id = req.body._id;
  const contents = req.body.contents;

  if (check_user(req)) {
    postModel.findOne({ _id: _id }, function (err, post) {
      if (err) {
        throw err;
      } else {
        post.contents = contents;
        post.save(function (err) {
          if (err) {
            throw err;
          } else {
            res.json({ status: 'SUCCESS' });
          }
        });
      }
    });
  }
});

router.post('/comment', function (req, res, next) {
  const _id = req.body._id;
  const author = req.body.author;
  const comment = req.body.comment;
  const date = Date.now();

  // comment 배열을 찾아서 뒤에다가 push 후 다시 save
  postModel.findOne({ _id: _id }, function (err, post) {
    if (err) {
      throw err;
    } else {
      post.comments.push({ author: author, comment: comment, date: date });
      post.save(function (err) {
        if (err) {
          throw err;
        } else {
          res.json({ status: 'SUCCESS' });
        }
      });
    }
  });
});

// login 성공시 serializeUser를 이용해 session에 user 정보를 저장
// page에 접근해서 server로 요청이 올 때마다 deserializeUser 메소드를 사용
// 이는 session에 저장된 값을 꺼내와서 req.user객체에 유저 정보를 저장하기 위함.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleCredentials.web.client_id,
      clientSecret: googleCredentials.web.client_secret,
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'],
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  }
);

// logout 부분
// session에 들어있던 유저 정보들이 모두 삭제됨
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
