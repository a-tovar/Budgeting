const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config/config");

const app = express();

app.use(express.json());

// db config
const db = config.mongoURI;

// connect to mongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// use routes
const users = require('./routes/api/users');
const defaultCategories = require('./routes/api/defaultCategories');

app.use('/api/users', users);
app.use('/api/defaultCategories', defaultCategories);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
