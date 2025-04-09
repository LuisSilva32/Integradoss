import mongoose from 'mongoose'

const ResearcherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Researcher = mongoose.model('Researcher', ResearcherSchema)

export default Researcher
