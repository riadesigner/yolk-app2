const { Schema, model } = require('mongoose');

const userInfoSchema = new Schema({
    firstName: { type:String },  
    secondName: { type:String },
    middleName: { type:String },
    gender: { type:String },
    phone: { type:String },
    webSite: { type: String }, 
    softSkills: { type: Array },
    hardSkills: { type: Array },    
    schools: { type: Array },
    specialization: { type: String },
    rating: { type: String },
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

