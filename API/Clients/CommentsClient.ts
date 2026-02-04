import { APIRequestContext, expect } from 'playwright/test'

export class CommentsClient {
  private request: APIRequestContext
  constructor(request: APIRequestContext) {
    this.request = request
  }

  async getComment(param: { id: number }) {
    const response = await this.request.get('/comments/' + param.id)
    expect(response.status()).toBe(200)
    return response.json()
  }

  async changeCommentsContent(param: { id: number; data: { name: string; email: string } }) {
    const response = await this.request.put('/comments/' + param.id, { data: param.data })
    expect(response.status()).toBe(200)
    return response.json()
  }

  async addNewComments(param: { data: { name: string; email: string } }) {
    const response = await this.request.post('/comments/', { data: param.data })
    expect(response.status()).toBe(201)
    return response.json()
  }

  async deleteComment(param: { id: number }) {
    const response = await this.request.delete('/comments/' + param.id)
    expect(response.status()).toBe(200)
    return response.json()
  }
}
