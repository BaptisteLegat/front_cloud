
export type Chat = {
  ID: number
  UpdatedAt: string
  name: string
  messages: object[]
}

export const chatService = {
  async getChat(chatId: string): Promise<Chat> {
    const response = await fetch('http://108.129.182.218:3001' + `/chats/${chatId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch chat')
    }
    return response.json()
  },
  async getChats(userId: string): Promise<Chat[]> {
    const response = await fetch('http://108.129.182.218:3001' + `/chats/user/${userId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch chats')
    }
    return response.json()
  },
  async createChat(userId: string, name?: string): Promise<Chat> {
    const response = await fetch('http://108.129.182.218:3001' + `/chats/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'Nouveau chat' })
    })
    if (!response.ok) {
      throw new Error('Failed to create chat')
    }
    return response.json()
  },
  async sendMessage(chatId: number, message: string): Promise<void> {
    const response = await fetch('http://108.129.182.218:3001' + `/chats/${chatId}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
    if (!response.ok) {
      throw new Error('Failed to send message')
    }
  }
}
