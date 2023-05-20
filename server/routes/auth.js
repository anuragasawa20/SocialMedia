// const express = require('express');
// const { login } = require('../controllers/auth');
import express from "express";
import { login } from "../controllers/auth.js";


const router = express.Router();

router.post('/login', login);




// module.exports = router;
export default router;