// const express = require('express');
// const { getFeedposts, getUserPosts, likePost } = require('../controllers/post');
// const verifyToken = require('../middleware/auth');
import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

// getting feedposts 
router.get('/', verifyToken, getFeedPosts);

router.get('/:userId/posts', verifyToken, getUserPosts);

router.patch('/:id/like', verifyToken, likePost);

// module.exports = router;

export default router;