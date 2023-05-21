const userModel = require("../models/User");
const validator = require('validator')


module.exports.registerUser = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        // Validate username

        const trimmedUsername = username.trim();

        if (validator.isEmpty(trimmedUsername)) {
            return res.status(400).send({ error: "Username is required" });
        } else if (!validator.matches(trimmedUsername, /^[A-Za-z]+([A-Za-z0-9_-]*[A-Za-z0-9])?$/)) {
            return res.status(400).send({ error: "The username format entered is not correct. You can use English letters, numbers, '-', and '_', but it cannot start or end with '-', '_' and cannot start with a number." });
        }

        // Email validation

        if (validator.isEmpty(email)) {
            return res.status(400).send({ error: "Email is required" });
        } else if (!validator.isEmail(email)) {
            return res.status(400).send({ error: "The email format entered is not correct" });
        }


        // Phone number validation

        if (validator.isEmpty(phone)) {
            return res.status(400).send({ error: "Phone is required" });
        } else if (!validator.isMobilePhone(phone, "fa-IR")) {
            return res.status(400).send({ error: "The phonenumber format entered is not correct" });
        }

        // Password validation

        if (validator.isEmpty(password)) {
            console.log("nslknlknsknlvkns الزامی است");
            return res.status(400).send({ error: "Password is required" });

        }

        else if (!validator.matches(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/)) {
            return res.status(400).send({ error: "The password format entered is not correct. Passwords must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character." });

        }


        const isExesitUser = await userModel.findOne({ $or: [{ email }, { phone }] });

        if (!isExesitUser) {

            console.log("Creat User");

            // Save the user

            const newUser = new userModel({
                username,
                email,
                phone,
                password,

            });

            const savedUser = await newUser.save();
            res.status(200).send({ message: "User registration successful" });
        }

        else {
            console.log("User already exists");
            res.status(400).send({ error: "This user already exists" });
        }

    } catch (err) {
        res.status(500).send({ error: err.message })
    }


}


module.exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ $or: [{ username }, { email: username }] });

        if (!user) {
            return res.status(404).send("User not found. Please register first.");
        }

        else if (user.password !== password || user.username !== username && user.email !== username) {
            return res.status(400).send("The Username Or Password is Incorrect");
        }

        else {
            res.status(200).send("Login successful.");

        }

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};


