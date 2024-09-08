const { createHmac, randomBytes } = require('crypto');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    salt:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    profilePhotoURL:{
        type: String,
        default: './images/default.png',
    },
    role:{
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER',
    }
},{timestamps: true});

UserSchema.pre('save', function(next){
    const user = this;

    if(!user.isModified('password')) return next();

    const salt = randomBytes(16).toString();
    const hash = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    this.salt = salt;
    this.password = hash;

    next();
}); 

UserSchema.static('matchPassword', async function(email, password){
    const user = await this.findOne({email});
    if(!user) throw new Error('User not found');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt)
    .update(password)
    .digest('hex');

    if(hashedPassword !== userProvidedHash) throw new Error('Incorrect password');
    return user;
})

const User = mongoose.model('User', UserSchema);

module.exports = User;