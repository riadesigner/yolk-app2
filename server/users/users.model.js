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
module.exports = model('users', userSchema);

