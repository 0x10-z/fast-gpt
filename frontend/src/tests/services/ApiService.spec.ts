
import { ApiService } from 'services/ApiService';
import { Message, Sender } from 'components/Message';
import fetch from "jest-fetch-mock";
import { User } from 'models/User';

const mockUser = User.from_dict({
  id: 1,
  api_key: "1234",
  created_at: "2022-12-12",
  username: "mockUser",
  tokens_available: 1000
});

const mockData = {
  ok: true,
  success: true,
  context: [
    {
      id: '46f59ebc-5472-46c2-be88-8af0a1cd3b21',
      role: 'user',
      content: 'hola que tal',
      timestamp: '2023/04/29 12:21:18',
    },
    {
      id: '4ff51077-cb9b-4356-9ae6-61f485f220c5',
      role: 'assistant',
      content:
        '¡Hola! Estoy aquí para ayudarte en lo que necesites. ¿En qué puedo ayudarte hoy?',
      timestamp: '2023/04/29 12:21:20',
    },
  ],
  last_response:
    '¡Hola! Estoy aquí para ayudarte en lo que necesites. ¿En qué puedo ayudarte hoy?',
  user:{
    "id": 1,
    "api_key": "0f7fed0c-9d34-42b5-8f03-b942b6bf605d",
    "created_at": "2023-05-01T02:43:44.941322",
    "username": "user",
    "tokens_available": 998498.4
  }
};

describe('ApiService', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  afterEach(() => {
    fetch.mockClear();
  });

  const testCases = {
    case1: {
      input: 'hello',
      expectedOutput: 'HELLO'
    },
    case2: {
      input: 'world',
      expectedOutput: 'WORLD'
    }
  }

  Object.entries(testCases).forEach(([name, { input, expectedOutput }]) => {
    test('chatGpt returns a message', async () => {
      // prepare
      console.log("Test case: " + name);
      mockData.last_response = expectedOutput;
      fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });
      const expectedHeaders = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${mockUser?.api_key}`,
      });

      // sut
      const sut = new ApiService();
      const message = await sut.chatGpt(input, mockUser!);
  
      // assert
      expect(message).toBeInstanceOf(Message);
      expect(message.content).toBe(expectedOutput);
      expect(message.sender).toBe(Sender.Assistant);
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:5000/chatgpt", {"body": "{\"message\":\""+input+"\"}", "headers": expectedHeaders, "method": "POST"}
      );
    });
  })
  

  test('chatGpt throws an error on response error', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });

    // sut
    const sut = new ApiService();

    // assert
    await expect(sut.chatGpt('Hello', mockUser!)).rejects.toThrow(
      'Error sending message: 404 Not Found'
    );
  });

  test('chatGpt throws an error on unsuccessful response', async () => {
    const mockData = { success: false, error: 'Something went wrong' };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    // sut
    const sut = new ApiService();

    // assert
    await expect(sut.chatGpt('Hello', mockUser!)).rejects.toThrow(
      'Something went wrong'
    );
  });

});

