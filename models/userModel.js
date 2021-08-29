const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password must be at least 6 characters']
    },
}, {timestamps: true});

//pre save
userSchema.pre('save', async function(next) {


    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    

    //other ways of doing it:
    /*
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
    next();
    */

    /*
    bcrypt.genSalt((err, salt) =>{
        bcrypt.hash(pass, salt, (err, hash) =>{
            this.password = hash;
        })
    });
    */
});

const User = mongoose.model('user', userSchema);

module.exports = User;