const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: { type:String, required:true},
    googleId: { type:String },
    yandexId: { type:String },
    mailruId: { type:String },
    passwordHash:{ type:String },
    name: { type:String },
    avatar: { type:String },    
    role: { type:String },
    // userInfo: { type:String },
    // portfolio: { type:String },
    createdAt: { type:Date, required:true },
    updatedAt: { type:Date, required:true },
});

module.exports = model('users', userSchema);

