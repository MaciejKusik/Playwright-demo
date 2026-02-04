import { expect } from 'playwright/test'
import { test } from '../../fixtures/apiFixtures'

test.describe('API Tests', () => {
  test('GET Comments', async ({ apiClient }) => {
    const COMMENT = await apiClient.getComment({ id: 1 })
    expect(COMMENT.id).toBe(1)
    expect(COMMENT.name).toBe('id labore ex et quam laborum')
  })

  test('Change Comment', async ({ apiClient }) => {
    const CHANGED_COMMENT = await apiClient.changeCommentsContent({ id: 2, data: { name: 'new_name', email: 'new_email' } })
    expect(CHANGED_COMMENT.name).toBe('new_name')
    expect(CHANGED_COMMENT.email).toBe('new_email')
  })

  test('Create Comment', async ({ apiClient }) => {
    const NEW_COMMENT = await apiClient.addNewComments({ data: { name: 'created_name', email: 'created_email' } })
    expect(NEW_COMMENT.name).toBe('created_name')
    expect(NEW_COMMENT.email).toBe('created_email')
  })

  test('Delete Comment', async ({ apiClient }) => {
    const DELETED_COMMENT = await apiClient.deleteComment({ id: 3 })
  })
})
