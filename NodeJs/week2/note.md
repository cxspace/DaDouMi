# Exercise (Instructions): Node and MongoDB Part 1

### Objectives and Outcomes

In this exercise you will install the Node MongoDB driver module and configure your Node application to communicate with the MongoDB server. At the end of this exercise, you will be able to:

- Install and use the Node MongoDB driver
- Interact with the MongoDB database from a Node application

### Installing the Node MongoDB Driver Module

- Create a new folder named *node-mongodb* and move into the folder.
- Install the Node MongoDB driver and the Assert module by typing the following at the prompt:

```
     npm install mongodb --save
     npm install assert --save
```

### A Simple Node-MongoDB Application

- Create a new file named *simpleserver.js *and add the following code to it:

```
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(err,null);
    console.log("Connected correctly to server");
        var collection = db.collection("dishes");
        collection.insertOne({name: "Uthapizza", description: "test"}, function(err,result){
        assert.equal(err,null);
        console.log("After Insert:");
        console.log(result.ops);
                collection.find({}).toArray(function(err,docs){
            assert.equal(err,null);
            console.log("Found:");
            console.log(docs);
                        db.dropCollection("dishes", function(err, result){
               assert.equal(err,null);
               db.close();
            });
        });
            });
});
```

- Make sure that your MongoDB server is up and running
- Type the following at the prompt to start the server and see the result.

```
     node simpleserver
```

### Conclusions

In this exercise you installed the Node MongoDB driver and used it to communicate with the MongoDB server from a Node application.

# Exercise (Instructions): Node and MongoDB Part 2

### Objectives and Outcomes

In this exercise you will continue to explore communicating from your Node application to the MongoDB server. At the end of this exercise you will be able to:

- Develop a Node module containing some common MongoDB operations
- Use the Node module in your application and communicate with the MongoDB server

### Implementing a Node Module of Database Operations

- Create a new file named *operations.js* that contains a few MongoDB operations and add the following code:

```
var assert = require('assert');

exports.insertDocument = function(db, document, collection, callback) {
      // Get the documents collection
  var coll = db.collection(collection);
      // Insert some documents
  coll.insert(document, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted " + result.result.n + " documents into the document collection "
                 + collection);
    callback(result);
  });
};

exports.findDocuments = function(db, collection, callback) {
  // Get the documents collection
  var coll = db.collection(collection);

  // Find some documents
  coll.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
};

exports.removeDocument = function(db, document, collection, callback) {

  // Get the documents collection
  var coll = db.collection(collection);

  // Delete the document
  coll.deleteOne(document, function(err, result) {
    assert.equal(err, null);
    console.log("Removed the document " + document);
    callback(result);
  });
};

exports.updateDocument = function(db, document, update, collection, callback) {

  // Get the documents collection
  var coll = db.collection(collection);

  // Update document
  coll.updateOne(document
    , { $set: update }, null, function(err, result) {

    assert.equal(err, null);
    console.log("Updated the document with " + update);
    callback(result);
  });
};
```

### Using the Node Module for Database Operations

- Create a new file named *server.js* and add the following code to it:

```
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var dboper = require('./operations');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    dboper.insertDocument(db, { name: "Vadonut", description: "Test" },
        "dishes", function (result) {
            console.log(result.ops);

            dboper.findDocuments(db, "dishes", function (docs) {
                console.log(docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" },
                    "dishes", function (result) {
                        console.log(result.result);

                        dboper.findDocuments(db, "dishes", function (docs) {
                            console.log(docs)

                            db.dropCollection("dishes", function (result) {
                                console.log(result);

                                db.close();
                            });
                        });
                    });
            });
        });
});
```

- Run the server by typing the following at the prompt and observe the results:

```
     node server
```

### Conclusions

In this exercise you created a Node module to package some database operations, and then used the module to interact with the MongoDB server.

# Exercise (Instructions): Mongoose ODM

### Objectives and Outcomes

In this exercise you will explore the Mongoose ODM and learn about creating schemas and interacting with the MongoDB database using Mongoose methods. At the end of this exercise, you will be able to:

- Install Mongoose ODM and connect to a MongoDB Server
- Create Mongoose Schemas
- Perform Database operations with Mongoose methods

### Installing Mongoose

- Create a folder named *node-mongoose* and move into the folder.
- In this folder, install Mongoose by typing the following at the prompt:

```
     npm install mongoose --save
     npm install assert --save
```

### Implementing a Node Application

- Create a sub-folder named *models* in the *node-mongoose* folder. Move to this folder.
- Create a file named *dishes-1.js* and add the following code to create a Mongoose schema:

```
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to our Node applications
module.exports = Dishes;
```

- Move to the* node-mongoose* folder and create a file named *server-1.js* and add the following code:

```
var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new user
    var newDish = Dishes({
        name: 'Uthapizza',
        description: 'Test'
    });

    // save the user
    newDish.save(function (err) {
        if (err) throw err;
        console.log('Dish created!');

        // get all the users
        Dishes.find({}, function (err, dishes) {
            if (err) throw err;

            // object of all the users
            console.log(dishes);
                        db.collection('dishes').drop(function () {
                db.close();
            });
        });
    });
});
```

- Make sure that your MongoDB server is up and running. Then at the terminal prompt type the following to start the server and see the result:

```
     node server-1
```

- Now, create another file named *server-2.js* and add the following code to it:

```
var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');
// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
    // create a new dish
    Dishes.create({
        name: 'Uthapizza',
        description: 'Test'
    }, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

        // get all the dishes
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Test'
                    }
                }, {
                    new: true
                })
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);

                    db.collection('dishes').drop(function () {
                        db.close();
                    });
                });
        }, 3000);
    });
});
```

- Run this server on the console and see the result.

### Adding Sub-documents to a Document

- Create a file named *dishes-3.js* in the *models* folder and add the following code to it:

```
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// create a schema
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments:[commentSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to our Node applications
module.exports = Dishes;
```

- Create another variation of the server named *server-3.js* and add the following code to it:

```
var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-3');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Dishes.create({
        name: 'Uthapizza',
        description: 'Test',
        comments: [
            {
                rating: 3,
                comment: 'This is insane',
                author: 'Matt Daemon'
            }
        ]
    }, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

        // get all the dishes
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Test'
                    }
                }, {
                    new: true
                })
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);

                    dish.comments.push({
                        rating: 5,
                        comment: 'I\'m getting a sinking feeling!',
                        author: 'Leonardo di Carpaccio'
                    });

                    dish.save(function (err, dish) {
                        console.log('Updated Comments!');
                        console.log(dish);

                        db.collection('dishes').drop(function () {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });
});
```

- Run the server and observe the result.

### Conclusions

In this exercise you learnt about the Mongoose module and used it to create schemas and interact with the MongoDB server.