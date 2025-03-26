const bcrypt = require('bcrypt');  // Importing the bcryptjs library
const jwt  = require('jsonwebtoken');  // Importing the jsonwebtoken library
const UserModel = require('../Models/User');   // Importing the user model
const singup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            return res.status(409).json({ message: 'User already exists', success: false });
        }
        const newUser = new UserModel({
            name,
            email,
            phone,
            password
        });
        newUser.password = await bcrypt.hash(password, 10);
        newUser.save();
        res.status(201).json({ message: 'User created successfully', success: true });

    } catch (error) {

        res.status(500).json({ message: 'Internal server error' + error, success: false });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
         
        const errorMeg = 'Invalid email or password';
      
        if (!user) {
            return res.status(409).json({ message: errorMeg + password, success: false });
        }
      
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(409).json({ message: errorMeg, success: false });
        }

        const JwtToekn = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        );
       
        res.status(200).json({ 
            message: 'Login successfully', 
            success: true,
            email,
            name: user.name,
            phone: user.phone, 
            JwtToekn
        });

    } catch (error) {

        res.status(500).json({ message: 'Internal server error ' + error, success: false });
    }
};


module.exports = {  // Exporting an object
    singup,
    login
};
