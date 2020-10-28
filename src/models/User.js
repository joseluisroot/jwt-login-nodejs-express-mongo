const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.comparePassword = async (password, recivedPassword) => {
    await bcrypt.compare(recivedPassword, password)
}

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = model('User', userSchema);