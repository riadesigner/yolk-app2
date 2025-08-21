const { Schema, model } = require('mongoose');

const categoriesSchema = new Schema({
    name: { type:String }, 
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = model('Categories', categoriesSchema);

