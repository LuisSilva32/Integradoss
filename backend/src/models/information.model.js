import mongoose from 'mongoose'

const informationSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['convocatoria', 'proyecto', 'publicacion'],
      required: true
    },
    title: {
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
      required: function () {
        return this.type === 'convocatoria'
      },
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
)

const Information = mongoose.model('Information', informationSchema)

export default Information
