import mongoose from 'mongoose'

const Schema = mongoose.Schema

const cartSchema = new Schema({
  prods:[{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }],
  comps:[{
    type: Schema.Types.ObjectId,
    ref: "Component"
  }]
}, {
  timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

export {
  Cart
}
