import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema({
  name: String,
  sku: String,
  price: Number,
  available: Boolean,
  components: [{
    type: Schema.Types.ObjectId,
    ref: "Component"
  }],
  compqty: [{
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
