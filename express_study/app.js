const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // http request에 대해 로깅하는 모듈, 객체를 생성

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express(); // express()로 app 객체 생성. app을 이용해여 웹 서버의 특징 기술

// view engine setup. 12 ~ 29 line => web server 특징 기술
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// 13 line => 화면을 보이게 할 뷰 템플릿 파일들이 있는 경로를 라우팅하기 위해
//            그 값을 미리 정의합니다. 화면의 출력을 담당하는 뷰 계층을 구성하는
//            파일들을 연결하는 부분이라고 이해하면 됩니다.여기서는 views 폴더로 지정해주었습니다.
//            따라서 앞으로 뷰 템플릿 파일을 만들고 난 후,
//            views 폴더 안에 넣어주고 라우팅을 설정해주면 됩니다.

// 14 line => view에 사용될 기본 엔진의 이름 정의. express에서는 ejs, pug(구 jade -> pug로 변경됨)
//           등을 지원

//20 line => directory 구조를 URL에 반영하여 쉽게 접근 가능한 정적 directory 설정

//31 ~ 40 line => error handling part
