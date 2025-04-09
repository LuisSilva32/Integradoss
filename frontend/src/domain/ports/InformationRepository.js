export class InformationRepository {
  async fetchInformation ({ page, limit, type, token }) {
    throw new Error('fetchInformation must be implemented')
  }

  async createInformation ({ data, token }) {
    throw new Error('createInformation must be implemented')
  }

  async updateInformation ({ id, data, token }) {
    throw new Error('updateInformation must be implemented')
  }

  async deleteInformation ({ id, token }) {
    throw new Error('deleteInformation must be implemented')
  }
}
