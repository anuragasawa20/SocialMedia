// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const dotenv = require('dotenv');
// const multer = require('multer');
// const connectDB = require('./db');
// const path = require('path');
// const { register } = require('./controllers/auth');
// const authRoute = require('./routes/auth');
// const userRoute = require('./routes/users');
// const postRoute = require('./routes/post');
// const verifyToken = require('./middleware/auth');
// const { createpost } = require('./controllers/post');
// const Post = require('./models/Post');
// const User = require('./models/User');
// const { users, posts } = require('./data/index');
// const cors = require('cors');

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import connectDB from "../server/db.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/post.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import { verifyToken } from "./middleware/auth.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

const app = express();
dotenv.config();
const PORT = 3001 || process.env.PORT;
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

app.listen(PORT, () => { console.log(`port is running on ${PORT}`) });

connectDB();

//User.insertMany(users);
//Post.insertMany(posts);
// Uploading files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "public/assets"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage });

//app.use('/', Routes);
app.post('/auth/register', upload.single("picture"), register);
app.post('/posts', verifyToken, upload.single("picture"), createPost);
// login routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
//route.post();



// module.exports = { single };