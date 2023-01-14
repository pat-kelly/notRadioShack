import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  favorites:[{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }],
  cart:{ type: Schema.Types.ObjectId, ref: "Cart"}
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
