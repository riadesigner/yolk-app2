const { Schema, model } = require('mongoose');

require('../userinfo/userinfo.model');
require('../companies/companies.model');

const userSchema = new Schema({
    email: { type:String, required:true},
    googleId: { type:String },
    yandexId: { type:String },
    mailruId: { type:String },
    passwordHash:{ type:String },
    name: { type:String },
    avatar: { type:String },    
    role: { type:String },    
    userInfo: { 
      type: Schema.Types.ObjectId, 
      ref: 'UserInfo' 
    },
    userCompany: { 
      type: Schema.Types.ObjectId, 
      ref: 'Company',
      default: null,
    },
    createdAt: { type:Date },
    updatedAt: { type:Date },
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});
module.exports = model('Users', userSchema);

