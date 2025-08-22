const { Schema, model } = require('mongoose');

const ordersSchema = new Schema({
    title: { type:String },  
    description: { type:String },
    categories: { type:Array },
    files: { type:Array },
    status: { type:String },
    companyId: { type:String },
    designerId: { type:String },
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

module.exports = model('Orders', ordersSchema);

