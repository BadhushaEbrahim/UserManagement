const User = require('../model/userMode');
const jwt = require('jsonwebtoken');
const generateToken = require('../util/generateToken');
let adminEmail = "admin@gmail.com";
let password = "12345";

module.exports = {
    adminLoginn: async (req, res) => {

        try {
            let adminData = req.body;

            if (adminEmail == adminData.email && password == adminData.password) {
         
                const token = generateToken(adminEmail)
                res.status(200).json({ status: "ok", admin: true, token })

            } else {
                res.status(200).json({ status: "not Ok", error: "admin details invalid" })
            }

        } catch (err) {
            res.status(200).json({ status: "error", error: "oops catch error" })
        }
    },


    getAllUsers: async (req, res) => {

        try {

            let users = await User.find();
            if (users) {

                res.status(200).json({ status: "ok", users: users })

            } else {
                console.log("no userrs found");
                res.status(200).json({ status: "error", users: "users not found" })
            }

        } catch (err) {

            res.status(200).json({ status: "error", error: "Data not found" })
            console.log(err);
        }
    },


    deleteUsers: async (req, res) => {
        try {
            const deletUser = await User.deleteOne({ _id: req.params.id });
            console.log("delete user")
            res.status(200).json({ status: "ok", message: "user deleted" })
        } catch (err) {
            console.log("user nto found")
            res.status(200).json({ status: "error", error: "something sent wrong" })
        }
    },


    getUserDetails: async (req, res) => {

        try {

            const user = await User.findOne({ _id: req.params.id });
            if (!user) {
                res.status(200).json({ status: "error", message: "user not found" })
            }
            else {
                res.status(200).json({ status: "ok", message: "user found", userData: user })
            }
        } catch (err) {
            console.log("user not found with the edit id ");
            res.status(400).json({ status: "error", message: "oops error" })
        }

    },


    updateUsers: async (req, res) => {
        try {
            const { userName, email } = req.body;
            let user = await User.findOne({ email: email })
            console.log(user, "is theis is the error")
            if (user == null) {

                const update = await User.findOneAndUpdate({ _id: req.params.id },
                    {
                        $set: {
                            userName,
                            email
                        }
                    })
                console.log(update, "user updated")
                res.status(200).json({ status: "ok", message: "user updated", userexists: false })
            } else {

                console.log("user already registered")
                res.status(200).json({ status: "error", message: "user already registered", userexists: true })
            }
        } catch (err) {
            console.log("update catch error")
            res.status(200).json({ status: "error", error: "update error" })
        }
    },


    adminSearchUser: async (req, res) => {
        const username = req.params.userkey;
        try {
            const users = await User.find({
                "$or": [
                    {
                        userName: { $regex: username }
                    },
                    {
                        email: { $regex: username }
                    }
                ]
            })
            res.status(200).json({ status: "ok", message: "user found", users })

        } catch (err) {
            res.status(200).json({ status: "error", message: "no user found" })
        }
    },


    verifyAdminToken: async (req, res) => {
        try {
            const decodedToken = jwt.verify(req.body.Token, 'secret123')
            console.log(decodedToken)
            if (decodedToken.id === adminEmail)
                return res.status(200).json({ message: "token valid", token: true });
            else return res.status(301).json({ message: "token invalid", token: false });
        } catch (err) {
            res.status(200).json({ status: 'error', error: "invalid token", token: false })
        }
    },
}