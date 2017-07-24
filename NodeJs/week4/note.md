# Exercise (Instructions): Mongoose Population

### Objectives and Outcomes

In this exercise you will learn about how you can reference one document from another in MongoDB. In addition you will use Mongoose population to populate information in a document from a referenced document. At the end of this exercise, you will be able to:

- Use Mongoose population to cross-reference users within a comment
- Populate the comments with the users’ information upon querying

### Update User Schema

- Open *user.js* and update the code for the schema as follows:

```
var User = new Schema({
    username: String,
    password: String,
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

User.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};
```

### Updating Dish Schema

- Open *dishes.js* and update the *comment* schema as follows:

```
var User = require('./user');  //important

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});
```

### Updating dishRouter.js

- Open dishRouter.js and update the routers and the methods as shown below:

```
dishRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.find({})
        .populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
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

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

dishRouter.route('/:dishId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Dishes.findByIdAndRemove(req.params.dishId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

dishRouter.route('/:dishId/comments')
.all(Verify.verifyOrdinaryUser)

.get(function (req, res, next) {
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish.comments);
    });
})

.post(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        req.body.postedBy = req.decoded._doc._id;
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
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
.all(Verify.verifyOrdinaryUser)

.get(function (req, res, next) {
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function (err, dish) {
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
                req.body.postedBy = req.decoded._doc._id;
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
        if (dish.comments.id(req.params.commentId).postedBy
           != req.decoded._doc._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});
```

### Updating users.js route

- Open users.js and update the register function as follows:

```
router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
        req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
                if(req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            user.lastname = req.body.lastname;
        }
                user.save(function(err,user) {
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
});
```

- Save all the changes and start the server and test.

### Conclusions

In this exercise you learnt about cross-referencing Mongo documents using the ObjectId. In addition you learnt about using Mongoose population support for populating documents.

# Exercise (Instructions): HTTPS and Secure Communication

### Objectives and Outcomes

In this exercise you will explore the use of the HTTPS server core node module to create and run a secure server. You will also learn about generating your private key and public certificate and use them to configure your Node HTTPS server. At the end of this exercise, you will be able to:

- Configure a secure server in Node using the core HTTPS module
- Generate the private key and public certificate and configure the HTTPS server
- Redirect traffic from the insecure HTTP server to a secure HTTPS server.

### Updating the bin/www File

- Open the *www* file in the *bin* directory and update its contents as follows:

```
#!/usr/bin/env node
/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('rest-server:server');
var http = require('http');
var https = require('https');
var fs = require('fs');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');

app.set('port', port);
app.set('secPort',port+443);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function() {
   console.log('Server listening on port ',port);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Create HTTPS server.
 */ var options = {
  key: fs.readFileSync(__dirname+'/private.key'),
  cert: fs.readFileSync(__dirname+'/certificate.pem')
};

var secureServer = https.createServer(options,app);

/**
 * Listen on provided port, on all network interfaces.
 */

secureServer.listen(app.get('secPort'), function() {
   console.log('Server listening on port ',app.get('secPort'));
});
secureServer.on('error', onError);
secureServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;

    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```

### Updating app.js

- Open app.js and add the following code to the file：

```
// Secure traffic only
app.all('*', function(req, res, next){
    console.log('req start: ',req.secure, req.hostname, req.url, app.get('port'));
  if (req.secure) {
    return next();
  };

 res.redirect('https://'+req.hostname+':'+app.get('secPort')+req.url);
});
```

### Generating Private Key and Certificate

- Go to the bin folder and then create the private key and certificate by typing the following at the prompt:

```
openssl genrsa 1024 > private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem
```

### Note for Windows Users

- If you are using a Windows machine, you may need to install openssl. You can find some openssl binary distributions [here](https://wiki.openssl.org/index.php/Binaries). Also, [this article](http://blog.didierstevens.com/2015/03/30/howto-make-your-own-cert-with-openssl-on-windows/) gives the steps for generating the certificates in Windows. Another [article](http://www.faqforge.com/windows/use-openssl-on-windows/)provides similar instructions. Here's an [online](http://www.selfsignedcertificate.com/) service to generate self-signed certificates.
- Run the server and test.

### Conclusions

In this exercise, you learnt about configuring a secure server running HTTPS protocol in our Express application.

