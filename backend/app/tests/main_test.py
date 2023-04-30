from fastapi.testclient import TestClient

from main import app
from openai_utils import OpenAIWrapper

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
    class Choices:
        class Message:
            message = {
                "role": "assistant",
                "content": "Mocked!!",
                "id": "111",
                "timestamp": "222",
            }

        choices = [Message()]

    def completion(self, _=None):
        return self.Choices()


def test_200():
    # mock
    mocked_openai = MockOpenAI()
    app.dependency_overrides[OpenAIWrapper] = MockOpenAI

    with TestClient(app) as client:
        response = client.post("/", json={"message": "Mocked!!"})
        json_response = response.json()
        assert response.status_code == 200
        assert json_response["last_response"] == "Mocked!!"
        assert json_response["success"] is True
        assert len(json_response["context"]) == 2
        assert mocked_openai.completion().choices[0].message in json_response["context"]
