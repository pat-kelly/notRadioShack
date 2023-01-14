import mongoose from 'mongoose'

const Schema = mongoose.Schema

const cartSchema = new Schema({
  contents:[{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }],
  runningTot: Number
}, {
  timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

export {
  Cart
}
