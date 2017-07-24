var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

/**
   获取所有用户列表，需要管理员权限
*/

router.get('/',Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next) {
  res.send('respond with a resource');
});

/**
   注册一个用户，不需要任何权限
*/

router.post('/register', function(req, res) {

    /**
     *  注册用户
     *
     *  通过用户名和密码（会被加密）注册一个用户，回调翻译一个user
     *  往user里面设置firstname + lastname,存储用户
     *  本地存储passport
     */

    User.register(new User({ username : req.body.username }),
      
        req.body.password , function(err, user) {

        if (err) {
            return res.status(500).json({err: err});
        }

        if(req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            user.lastname = req.body.lastname;
        }

        /**
         * 本地存储passport
         */

        user.save(function(err,user) {
            passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
});

/**
 *
 *   登录逻辑
 *
 *   直接回调验证用户是否有权限
 *
 *
 *
 */

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
    
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        
        var token = Verify.getToken({"username":user.username,"_id":user._id,"admin":user.admin});

      //登录成功返回token到客户端
        res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token

      });
    });
  })(req,res,next);
});

/**
 *   退出登录逻辑
 */

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = router;