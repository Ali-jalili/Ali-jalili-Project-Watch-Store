const userModel = require("../models/User");
const validator = require('validator');


module.exports.registerUser = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;


        // const isExesitUser = await userModel.find({ email });

        const isExesitUser = await userModel.findOne({ $or: [{ email }, { phone }] });

        if (isExesitUser.length === 0) {

            console.log("Creat User");
            // ذخیره کاربر
            const newUser = new userModel({
                username,
                email,
                phone,
                password,

            });

            const savedUser = await newUser.save();
            res.status(200).send(savedUser);

        }

        else {
            console.log("User Hast");
            res.status(400).send({ error: "Tekrari" })
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

        if (user.password !== password || user.username !== username && user.email !== username) {
            return res.status(400).send("The Username Or Password is Incorrect");
        }

        res.status(200).send("Login successful.");
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};




















        // if (!validator.isAlpha(username)) {
        //     return res.status(400).json({ error: 'نام نامعتبر است' });
        // }

        // // اعتبار سنجی ایمیل
        // if (!validator.isEmail(email)) {
        //     return res.status(400).json({ error: 'ایمیل نامعتبر است' });
        // }

        // // اعتبار سنجی رمز عبور
        // if (!validator.isStrongPassword(password)) {
        //     return res.status(400).json({ error: 'رمز عبور باید حداقل شامل ۸ حرف، یک حرف بزرگ و یک عدد باشد' });
        // }

        // if (!validator.isMobilePhone(phone)) {
        //     return res.status(400).json({ error: "Invalid phone" });
        // }