from fastapi.testclient import TestClient

from main import app
from models import Message, MessageList, Role
from openai_utils import OpenAI

client = TestClient(app)


def test_404_not_found():
    response = client.get("/nonexistingurl")
    assert response.status_code == 404
    assert response.json() == {"detail": "Not Found"}


def test_405_method_not_allowed():
    response = client.get("/")
    assert response.status_code == 405
    assert response.json() == {"detail": "Method Not Allowed"}


def test_422_field_required():
    response = client.post("/")
    assert response.status_code == 422
    assert response.json() == {
        "detail": [
            {"loc": ["body"], "msg": "field required", "type": "value_error.missing"}
        ]
    }


class MockOpenAI:
    def __init__(self):
        self.message_list = MessageList()
        self.message_list.messages.append(
            Message(id="1234", role=Role.USER, content="Mocked!!", timestamp="111")
        )

    def completion(self, content):
        return self.message_list.messages

class MockOpenAI:
    def __init__(self):
        self.message_list = MessageList()
        self.message_list.messages.append(
            Message(id="1234", role=Role.USER, content="Mocked!!", timestamp="111")
        )

    def completion(self, content):
        return self.message_list.messages

def test_200():
    # mock
    mocked_openai = MockOpenAI()
    app.dependency_overrides[OpenAI] = MockOpenAI

    with TestClient(app) as client:
        response = client.post("/", json={"message": "Hola!"})
        assert response.status_code == 200
        assert response.json() == {
            "context": mocked_openai.message_list.messages,
            "last_response": "Mocked!!",
            "success": True,
        }
