const { Schema, model } = require('mongoose');

const companySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    name: { type: String },
    city: { type: String },
    logo: {
      type: Object, // {key: String, url: String }
      default: null,
    },
    specialization: { type: String },
    description: { type: String },
    gallery: { type: Array },
    details: { type: Object },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

companySchema.virtual('user', {
  ref: 'Users',
  localField: 'userId',
  foreignField: '_id',
});

module.exports = model('Company', companySchema);
