export type Chat = {
	ID: number
	UpdatedAt: string
	name: string
	messages: object[]
}

export const chatService = {
	async getChat(chatId: string): Promise<Chat> {
		const response = await fetch(`${process.env.API_URL}` + `/chats/${chatId}`)
		if (!response.ok) {
			throw new Error('Failed to fetch chat')
		}

		return response.json()
	},
	async getChats(userId: string): Promise<Chat[]> {
		const response = await fetch(`${process.env.API_URL}` + `/chats/user/${userId}`)
		if (!response.ok) {
			throw new Error('Failed to fetch chats')
		}

		return response.json()
	},
	async createChat(userId: string): Promise<Chat> {
		const response = await fetch(`${process.env.API_URL}` + `/chats/${userId}`, {
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
	async sendMessage(chatId: number, prompt: string): Promise<string> {
		const response = await fetch(`${process.env.API_URL}` + `/chats/${chatId}/message`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ prompt }),
		});

		if (!response.ok) {
			throw new Error('Failed to send message');
		}

		const reader = response.body?.getReader();
		const decoder = new TextDecoder();
		let assistantMessage = '';

		if (!reader) {
			throw new Error('Failed to read response stream');
		}

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			assistantMessage += decoder.decode(value, { stream: true });
		}

		return assistantMessage;
	},
	async editChatName(chatId: number, name: string): Promise<void> {
		const response = await fetch(`${process.env.API_URL}` + `/chats/${chatId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name }),
		});

		if (!response.ok) {
			throw new Error('Failed to edit chat name');
		}

		return;
	},
	async deleteChat(chatId: number): Promise<void> {
		const response = await fetch(`${process.env.API_URL}` + `/chats/${chatId}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			throw new Error('Failed to delete chat');
		}

		return;
	}
};

