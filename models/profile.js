import mongoose from 'mongoose'
import { Cart } from './cart.js'

const Schema = mongoose.Schema

const cartSchema = new Schema({
  prods:[{
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    default: []
  }],
  prodsQty:[{
    type: Number,
    required: true,
    default: []
  }],
  comps:[{
    type: Schema.Types.ObjectId,
    ref: "Component",
    required: true,
    default: []
  }],
  compsQty:[{
    type: Number,
    required: true,
    default: []
  }],
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  favorites:[{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }],
  cart: {
    type: cartSchema,
    default:{
      prods: [],
      prodsQty: [],
      comps: [],
      compsqty: []
    }
  }
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
