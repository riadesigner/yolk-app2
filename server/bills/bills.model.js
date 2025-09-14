const { Schema, model } = require('mongoose');

const billsSchema = new Schema({
    direction: {type: String }, // TO_YOLK | FROM_YOLK
    sender:{ // отправитель
      type: Schema.Types.Mixed,
      ref: 'User',
      default: null,
    }, 
    receiver: { // получатель
      type: Schema.Types.Mixed,
      ref: 'User',
      default: null,      
    }, 
    key: { type:String },  // Номер счета 
    order: { type: Schema.Types.ObjectId, ref: 'Order' }, // Заказ 
    description: { type:String },  // Основание счета
    paid: { // Оплачен или нет 
      type: Boolean,
      default: false,      
    }, 
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

module.exports = model('Bills', billsSchema);

