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
  }]
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export {
  Product
}
