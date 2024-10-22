const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: (true,'Username required')
    },

    email:{
        type: String,
        required: (true,'Email required'),
        unique: true
    },
    password:{
        type: String,
        required: (true,'Password required')
    }
})
module.exports = mongoose.model('User', UserSchema);