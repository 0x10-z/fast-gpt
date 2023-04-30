import pytest
from fastapi.testclient import TestClient

from main import app


@pytest.fixture(scope="module")
def client():
    headers = {"Authorization": "Bearer 1234"}
    with TestClient(app) as client:
        client.headers.update(headers)
        yield client


@pytest.fixture(scope="module")
def non_auth_client():
    with TestClient(app) as client:
        yield client
