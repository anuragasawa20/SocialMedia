// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import User from "../models/User.js";


export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        console.log(firstName);
        const salt = await bcrypt.genSalt();
        const HashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: HashPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const saveUser = await newUser.save();
        console.log(saveUser);
        res.status(201).json(saveUser);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user)
            return res.status(500).json({ msg: "user not found" });
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(500).json({ msg: "Invalid Password" });
        const token = jwt.sign({ id: user._id }, process.env.jwt_secretKey);
        delete user.password;
        res.status(200).json({ token, user });

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}


//module.exports = { register, login };
