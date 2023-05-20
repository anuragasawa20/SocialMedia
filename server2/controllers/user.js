// const express = require('express');

// const Users = require('../models/User');
import User from "../models/User.js";

// getting users by id
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }

}

// getting user's friends
export const getUserFriends = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friendsDetails = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friendsDetails.map(({ _id, FirstName, LastName, occupation, picturePath, location }) => {
            return ({ _id, FirstName, LastName, occupation, picturePath, location });
        })
        res.status(200).json(formattedFriends);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();


        const friendsDetails = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friendsDetails.map(({ _id, FirstName, LastName, occupation, picturePath, location }) => {
            return { _id, FirstName, LastName, occupation, picturePath, location };
        })
        res.status(200).json(formattedFriends);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}


//module.exports = { getUser, getUserFriends, addRemoveFriend };
