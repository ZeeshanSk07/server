const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

function login() {
    return async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.json({
                    message: 'Email and password are required'
                })
            }
            const existingUser = await User.findOne({ email: email });

            if (existingUser) {
                const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
                if (isPasswordCorrect) {
                    const token = jwt.sign(
                        { userID: existingUser._id },
                        process.env.JWT_SECRET
                    );
                    res.status(200).json({
                        message: 'Login successful',
                        email: existingUser.email,
                        username: existingUser.username,
                        id: existingUser._id,
                        token
                    });

                } else {
                    res.status(400).json({
                        message: 'Invalid credentials',
                    });
                }
            } else {
                res.status(400).json({
                    message: 'User not found',
                });
            }
        } catch (error) {
            next("Error Logging In", error);
        }
    };
}

function Updateuser(){
    return async (req,res,next) => {
        try {
            const {email, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.findByIdAndUpdate(req.params.id, {email,password:hashedPassword}, { new: true });
            if (user) {
                res.status(200).json({
                    message: 'User updated successfully',
                    user: user
                });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            next("Error updating user", error);
        }
    };
}



module.exports = {
    login,
    Updateuser
};