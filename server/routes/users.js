// const express = require('express');

// const { getUser, getUserFriends, addRemoveFriend } = require('../controllers/user');
// const verifyToken = require('../middleware/auth');

import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

// getting all user's    
router.get('/:id', verifyToken, getUser);

// getting user's friends 
router.get('/:id/friends', verifyToken, getUserFriends);

// updating the friends column
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

//module.exports = router;
export default router;