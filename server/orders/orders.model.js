const { Schema, model } = require('mongoose');

const ordersSchema = new Schema({
    title: { type:String },  
    description: { type:String },
    tags: { type: [String] },
    categories: { type: [String] },
    files: {type: Array},
    status: { type:String },    
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    contractor: { type: Schema.Types.ObjectId, ref: 'Users' },
    price: { type: Number },
    dateTo: { type: Date },
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

ordersSchema.index({
  title: 'text',
  description: 'text', 
  tags: 'text'
});

module.exports = model('Orders', ordersSchema);