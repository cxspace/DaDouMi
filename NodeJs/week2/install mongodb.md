# Exercise (Instructions): Introduction to MongoDB

### Objectives and Outcomes

In this exercise you will download and install MongoDB on your computer. You will then start a MongoDB server and interact with it using the Mongo REPL shell. At the end of this exercise, you will be able to:

- Download and Installing MongoDB
- Start the server and interact with it using the Mongo REPL shell

### Downloading and Installing MongoDB

- Go to [http://www.mongodb.org](http://www.mongodb.org/), then download and install MongoDB as per the instructions given there.
- Create a folder named *mongodb* on your computer and create a subfolder under it named *data*.
- Move to the *mongodb* folder and then start the MongoDB server by typing the following at the prompt:

```
     mongod --dbpath=data
```

- Open another command window and then type the following at the command prompt to start the mongo REPL shell:

```
     mongo
```

- The Mongo REPL shell will start running and give you a prompt to issue commands to the MongoDB server. At the Mongo REPL prompt, type the following commands one by one and see the resulting behavior:

```
     db
     use conFusion
     db
     db.help()
```

- You will now create a collection named dishes, and insert a new dish document in the collection:

```
     db.dishes.insert({ name: "Uthapizza", description: "Test" });
```

- Then to print out the dishes in the collection, type:

```
     db.dishes.find().pretty();
```

Note the _id assigned to the dish.

- Next, we will learn the information encoded into the ObjectId by typing the following at the prompt:

```
     var id = new ObjectId();
     id.getTimestamp();
```

### Conclusions

In this exercise, you learnt to download and install MongoDB. Then you started the MongoDB server and interacted with it using the Mongo REPL shell.