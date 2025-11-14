import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    // simple text icon (emoji or short label)
    emoji: { type: String, default: '' },
    // optional image URL
    imageUrl: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Service', ServiceSchema)
