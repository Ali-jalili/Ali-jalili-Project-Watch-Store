const userModel = require("../models/User");
const validator = require('validator');
const { use } = require("../routers/User");

module.exports.registerUser = async (req, res) => {

    // res.send('Helloooooooooooooo')


    try {
        const { username, email, phone, password } = req.body;

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

        const isExesitUser = await userModel.find({ email });

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
            res.status(200).send({ error: "Tekrari" })
        }

        // console.log(isExesitUser);






    } catch (err) {
        res.status(500).send({ error: err.message })
    }


}


module.exports.loginUser = async (req, res) => {

    try {

        const { username, password } = req.body;

        // const user = await userModel.find({ email: username });
        const user = await userModel.find({ $or: [{ email: username }, { username: username }] });



        if (user.length === 0) {
            res.status(200).send("not found user")
        }

        else {

            if (user[0].password === password) {

                res.status(200).send(user[0])

            }
            else {
                res.status(400).send("nashodddddddddddddddd")
            }
        }


    }

    catch (err) {
        res.status(500).send({ error: err.message })
    }

}

