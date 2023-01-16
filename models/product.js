import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {type: String, default: ''},
  description: {type: String, default: ''},
  shortDesc: {type: String, default: ''},
  img: {type: String, default: ''},
  sku:  {type: String, default: ''},
  price:  {type: Number, default: 0},
  available:  {type: Boolean, default: false},
  components: [{
    type: Schema.Types.ObjectId,
    ref: "Component"
  }],
  compQty: [{
    type: Number,
    min: 0
  }]
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export {
  Product
}
