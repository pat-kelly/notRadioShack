import mongoose from 'mongoose'

const Schema = mongoose.Schema

const componentSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  shortDesc: {type: String, defulat: ''},
  cost: { type: Number, default: 0, min: 0 },
  partNo: { type: String, default: '' },
  vendor:{ type: String, default: '' },
  qty: { type: Number, min: 0, default: 0 },
  available:{ type: Boolean, default: false },
  type: { type: String, default: '' },
  img: { type: String, default: '' }
}, {
  timestamps: true
})

const Component = mongoose.model('Component', componentSchema)

export {
  Component
}
