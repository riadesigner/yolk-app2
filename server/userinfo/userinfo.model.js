const { Schema, model } = require('mongoose');

const userInfoSchema = new Schema({
    firstName: { type:String },  
    secondName: { type:String },
    gender: { type:String }, // 'male' | 'female'
    phone: { type:String },
    social: { type: Array }, // string[]
    softSkills: { type: Array }, // string[]
    hardSkills: { type: Array }, // string[]    
    education: { type: Array }, // string[]    
    rating: { type: Array }, // string[]
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

module.exports = model('UserInfo', userInfoSchema);

