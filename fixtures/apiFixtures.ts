import { test as base } from '@playwright/test'
import { CommentsClient } from '../API/Clients/CommentsClient'

type Fixtures = {
  apiClient: CommentsClient
}

export const test = base.extend<Fixtures>({
  apiClient: async ({ request }, use) => {
    const client = new CommentsClient(request)
    await use(client)
  },
})
