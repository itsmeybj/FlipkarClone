const generateToken = require("../config/jsonToken")
const {User,validate,validateLogin} = require("../models/userModel")
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {

    const { error } = validate(req.body)

    if (error)
        return res.status(400).send({ success: false, msg: error.details[0].message })

    try {
        const email = req.body.email;
        const findUser = await User.findOne({ email });
        
        if (!findUser) {

            const obj = {
                email: req.body.email,
                mobile: req.body.mobile,
                password: req.body.password,
            }

            const newUser = await User.create(obj)

            res.status(200).send({ success: true, msg: "Registration Complited!!! You can Login now", data: newUser })
        } else {
            res.status(403).send({ success: false, msg: "User Already Exits" })
        }
    } catch (err) {
        return res.status(422).send({ success: false, msg: `${err}` })
    }
}

const loginUser = async (req, res) => {

    const { error } = validateLogin(req.body);

    if (error)
        return res.status(400).send({ success: false, msg: error.details[0].message })

    try {
        const email = req.body.email;
        const password = req.body.password;

        const findUser = await User.findOne({ email })
        let token;
        if (findUser && (await findUser.isPasswordMatched(password))) {
            token = generateToken(findUser._id);

            res.cookie("token", token, { httpOnly: false, maxAge: (60 * 60 * 24 * 30) * 1000, })

            let obj = {
                _id: findUser._id,
                email: findUser.email,
                mobile: findUser.mobile,
                token: token,
            }

            res.status(200).send({ success: true, msg: "Login Sucess", data: obj })
        }
        else {
            res.status(422).send({ success: false, msg: "Invalid Creditional" });
        }

    } catch (err) {
        console.log(err)
    }
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
