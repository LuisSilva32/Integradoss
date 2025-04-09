export class ResearcherRepository {
  async fetchResearchers ({ page, limit, search, token }) {
    throw new Error('fetchResearchers must be implemented')
  }

  async createResearcher ({ data, token }) {
    throw new Error('createResearcher must be implemented')
  }

  async updateResearcher ({ id, data, token }) {
    throw new Error('updateResearcher must be implemented')
  }

  async deleteResearcher ({ id, token }) {
    throw new Error('deleteResearcher must be implemented')
  }
}
