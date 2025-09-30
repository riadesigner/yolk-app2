const { Schema, model } = require('mongoose');

const orderViewSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Orders', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  viewedAt: { type: Date, default: Date.now },
});

// Уникальный индекс на комбинацию orderId + userId
orderViewSchema.index({ orderId: 1, userId: 1 }, { unique: true });

module.exports = model('OrderView', orderViewSchema);
