export class Researcher {
  constructor ({ _id, name, description, image, createdAt }) {
    this._id = _id
    this.name = name
    this.description = description
    this.image = image || null
    this.createdAt = createdAt || new Date()
  }
}
