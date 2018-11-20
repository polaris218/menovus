import { renderToString } from 'react-dom/server';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import App from './src/Components/App';
import configureStore from './src/configureStore';
import renderFullPage from './template/template';
import webpack from 'webpack';
import webpackConfig from './webpack.config';

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import userRouter from './routes/user';
import profileRouter from './routes/profile';
import userInfoRouter from './routes/userInfo';

const app = express();
// console.log(app.get('env'));
if (app.get('env') === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api/login', userRouter);
app.use('/api/userinfo', userInfoRouter);
app.use('/api/usersignup', userInfoRouter);
app.use('/profile', profileRouter);

app.use((req, res) => {
  const context = {};
  let initialState = {
    userlogin: false,
    toggle: false,
    token: '',
    userAdmin: '',
  }

  const store = configureStore(initialState);
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    </Provider>,
  );
  const preloadedState = store.getState();
  res.send(renderFullPage(html, preloadedState));
  res.end();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({});
});

module.exports = app;
