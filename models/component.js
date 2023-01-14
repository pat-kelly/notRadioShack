import mongoose from 'mongoose'

const Schema = mongoose.Schema

const componentSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  cost: {
    type: Number,
    default: 0,
    min: 0
  },
  partNo: {
    type: String,
    default: ''
  },
  vendor: String,
  type: String,
  qty: {
    type: Number,
    min: 0,
    default: 0
  },
  available:{
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Component = mongoose.model('Component', componentSchema)

export {
  Component
}
