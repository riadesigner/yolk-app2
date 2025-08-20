const { Schema, model } = require('mongoose');

const companySchema = new Schema({
    name: { type:String },  
    city: { type:String },
    specialization: { type:String },
    description: { type:String },
    gallery: { type:Array },    
    orders: { type: Schema.Types.ObjectId, ref: 'Orders' },
    details: { type:Object },
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

module.exports = model('Company', companySchema);

