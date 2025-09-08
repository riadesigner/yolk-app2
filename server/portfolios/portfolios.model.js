const { Schema, model } = require('mongoose');

const portfoliosSchema = new Schema({
    designer: { type: Schema.Types.ObjectId, ref: 'Users' },
    title: { type:String },  
    description: { type:String },
    images: { type: Array },
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

portfoliosSchema.index({
  title: 'text',
  description: 'text',
});

module.exports = model('Portfolios', portfoliosSchema);