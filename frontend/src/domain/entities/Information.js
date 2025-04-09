export class Information {
  constructor ({ _id, type, title, description, image, createdAt }) {
    this._id = _id
    this.type = type // 'convocatoria', 'proyecto', 'publicacion'
    this.title = title
    this.description = description
    this.image = image || null
    this.createdAt = createdAt || new Date()
  }
}
