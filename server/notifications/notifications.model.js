const { Schema, model } = require('mongoose');

const notificationsSchema = new Schema(
  {
    title: { type: String },
    links: { type: Array },
    receiver: { type: String },
    readAt: { type: Date, default: null },
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
    },
  },
);

module.exports = model('Notifications', notificationsSchema);
