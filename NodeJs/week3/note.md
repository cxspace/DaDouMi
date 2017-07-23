# Exercise (Instructions): REST API with Express, MongoDB and Mongoose

### Objectives and Outcomes

In this exercise, you will integrate the REST API server based on the Express framework that you implemented earlier, together with the Mongoose schema and models that you developed as part of Assignment 2 to create a full-fledged REST API server. At the end of this exercise, you will be able to:

- Develop a full-fledged REST API server with Express, MongoDB and Mongoose
- Serve up various REST API end points together with interaction with the MongoDB server.

### Scaffold out an Express Application

- Scaffold out an Express application named rest-server using the Express generator at a convenient location on your computer by typing the following at the prompt:

```
     express rest-server
```

- Now you will copy in some of the code you developed in the Express-generator exercise in the previous module in the *node-express-gen* folder.
- Go to *node-express-gen* folder and copy the *app.js* file into the *rest-server* folder.
- From the *node-express-gen/routes* folder, copy the *dishRouter.js*, *promoRouter.js* and *leaderRouter.js* files to the *rest-server/routes* folder.
- Copy the *models* folder from your Assignment 2 solution to the *rest-server* folder.
- First do an npm install in the *rest-server* folder to install all the modules. Install mongoose and mongoose-currency Node modules by typing the following at the prompt:

```
     npm install     
     npm install mongoose mongoose-currency --save
```

- Open app.js file and add in the code to connect to the MongoDB server as follows:

```
var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});
```

- Now open *dishRouter.js* and update its code as follows:

```
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get(function (req, res, next) {
    Dishes.find({}, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(function (req, res, next) {
    Dishes.create(req.body, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        var id = dish._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Dishes.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

dishRouter.route('/:dishId')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(function (req, res, next) {
    Dishes.findByIdAndRemove(req.params.dishId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});
```

- Do a similar update to *promoRouter.js* and *leaderRouter.js* to support the REST API operations on promotions and leadership information.

### Handling Comments

- Add the following code to *dishRouter.js* to handle comments:

```
dishRouter.route('/:dishId/comments')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments);
    });
})

.post(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        for (var i = (dish.comments.length - 1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

dishRouter.route('/:dishId/comments/:commentId')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = dishRouter;
```

- Save the changes and start the server. Make sure your MongoDB server is up and running.
- You can now fire up postman and then perform several operations on the REST API. You can use the data for all the dishes, promotions and leadership provided in the db.json file given below to test your server:

[db.json](https://d3c33hcgiwev3.cloudfront.net/_e092bf04c8989b0f3c8e3e0757fd4ee2_db.json?Expires=1500768000&Signature=MgV0oPVuKVa9P0mlqG0bukVlKI-6MoWFCbZFEJzMYJTZmdc3WT2ddbMsjZJlN5IJ-EM0g8txrtTuwjQJOINuTB1s3eYZpA5aUp9IIMinEfUBRE7LmhUjx9k5ISv0N0u3ZBePemOK1ubjzfIokhr2mZeC70IJWuOjqHgUH93UPh0_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)

### Conclusions

In this exercise you developed a full-fledged REST API server with Express, Mongo and Mongoose.

# Exercise (Instructions): Basic Authentication

### Objectives and Outcomes

In this exercise you will use basic authentication approach to authenticate users. At the end of this exercise, you will be able to:

- Set up an Express server to handle basic authentication
- Use the basic access authentication approach to do basic authentication.

### Setting up the Express Server

- Create a folder named *basic-auth* and then copy the *server-2.js* file in the *node-express* folder that you did as part of the *node-express* exercise. Also copy the *public* folder and the *package.json* file from there also to *basic-auth* folder. Rename *server-2.js* as *server.js*.
- Then go to the basic-auth folder and install all the node modules by typing the following at the prompt:

```
     npm install
```

- Open the *server.js* file and update its contents as follows:

```
var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

function auth (req, res, next) {
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);
        return;
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);
    }
}

app.use(auth);

app.use(express.static(__dirname + '/public'));
app.use(function(err,req,res,next) {
            res.writeHead(err.status || 500, {
            'WWW-Authenticate': 'Basic',
            'Content-Type': 'text/plain'
        });
        res.end(err.message);
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});


```

- Save the changes and start the server. Access the server from a browser and see the result.

### Conclusions

In this exercise you learnt about performing basic authentication with username and password in a browser.

# Exercise (Instructions): Using Cookies

### Objectives and Outcomes

In this exercise you will examine the use of cookies for authentication. The server will send a signed cookie to the client upon successful authentication, and expects the client to include the cookie with every subsequent request. At the end of this exercise, you will be able to:

- Set up your Express application to send signed cookies.
- Set up your Express application to parse the cookies in the header of the incoming request messages

### Using cookie-parser

- Install the *cookie-parser* Express middleware in your basic-auth folder by typing the following at the prompt:

```
     npm install cookie-parser --save
```

- Create a new file named server-2.js and add the following code to it:

```
var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use(cookieParser('12345-67890-09876-54321')); // secret key

function auth (req, res, next) {

    if (!req.signedCookies.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            res.cookie('user','admin',{signed: true});
            next(); // authorized
        } else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
    else {
        if (req.signedCookies.user === 'admin') {
            next();
        }
        else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
};

app.use(auth);

app.use(express.static(__dirname + '/public'));

app.use(function(err,req,res,next) {

            res.writeHead(err.status || 500, {
            'WWW-Authenticate': 'Basic',
            'Content-Type': 'text/plain'
        });
        res.end(err.message);
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

- Save the changes, run the server and test the behavior.

### Conclusions

In this exercise you examined the use of cookies for tracking authenticated users so that subsequent access to the server can be enabled without need for authentication.

# Exercise (Instructions): Express Sessions

### Objectives and Outcomes

In this exercise you will use Express sessions to track authenticated users so as to enable authenticated access to server resources. At the end of this exercise you will be able to:

- Set up your Express server to use Express sessions to track authenticated users
- Enable clients to access secure resources on the server after authentication.

### Installing express-session

- Still in the basic-auth folder, install *express-session* and *session-file-store* Node modules as follows:

```
     npm install express-session session-file-store --save
```

### Using express-session

- Then create a new file named *server-3.js* and add the following code to it:

```
var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

function auth (req, res, next) {
    console.log(req.headers);
    if (!req.session.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            req.session.user = 'admin';
            next(); // authorized
        } else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
    else {
        if (req.session.user === 'admin') {
            console.log('req.session: ',req.session);
            next();
        }
        else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }}

app.use(auth);

app.use(express.static(__dirname + '/public'));

app.use(function(err,req,res,next) {
            res.writeHead(err.status || 500, {
            'WWW-Authenticate': 'Basic',
            'Content-Type': 'text/plain'
        });
        res.end(err.message);
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

- Save the changes, run the server and examine the behavior.

### Conclusions

In this exercise you set up the Express server to use express-session to track authenticated users to provide access to secure resources.

# Exercise (Instructions): User Authentication with Passport

### Objectives and Outcomes

In this exercise, you will explore user authentication with JSON web tokens and the Passport module. You will be able to control access to some routes within your REST server. At the end of this exercise, you will be able to:

- Use JSON web tokens for token-based user authentication
- Use Passport module together with passport-local and passport-local-mongoose for setting up local authentication within your server.

### Setting up the Project

- Copy the *rest-server* folder that you created in the first exercise in this module and rename the folder copy as *rest-server-passport*. You will modify this project to set up user authentication support using tokens and Passport.

### Installing Passport and jsonwebtoken Node Modules

- Install the Passport related Node modules and the jsonwebtoken module as follows:

```
     npm install passport passport-local passport-local-mongoose --save
     npm install jsonwebtoken --save
```

### Set up a config File

- Create a new file named config.js and add the following code to it:

```
module.exports = {
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl' : 'mongodb://localhost:27017/conFusion'
}
```

### Updating app.js

- Update app.js as follows:

```
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var config = require('./config');

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

var routes = require('./routes/index');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// passport config
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leadership',leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
```

### Setting up User Schema and Model

- In the models folder, create a file named user.js and add the following code to it:

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    admin:   {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
```

### Updating /users route in users.js

- Open *users.js* file in the *routes* folder and update the code as follows:

```
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify    = require('./verify');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
      req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration Successful!'});
        });
    });
});

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
        
      var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = router;
```

### Supporting JSON Web Tokens and Verification

- In the *routes* folder create a file named *verify.js* and add the following code to it:

```
var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};
```

### Controlling Routes with Authentication

- Open *dishRouter.js* and updated the code for the '/' route as follows:

```
var Verify = require('./verify');

dishRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {

   . . .

})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {

   . . .

})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {

   . . .

});
```

- Save the changes and test the server by sending various requests.

### Conclusions

In this exercise you used token-based verification together with the Passport module to verify the authenticity of users and control access to routes in a REST API server.