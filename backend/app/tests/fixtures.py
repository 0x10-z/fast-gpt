import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

import models
from database import Base
from dependencies import get_db
from main import app
from models import User

## DB Fixtures
args = dict(echo=True, connect_args={"check_same_thread": False}, poolclass=StaticPool)
engine = create_engine("sqlite:///:memory:", **args)
# engine = create_engine("sqlite:///./test.db", connect_args={"check_same_thread": False})


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)
app.dependency_overrides[get_db] = override_get_db


def seed_database():
    db = next(override_get_db())
    user = User(
        username="User 1", hashed_password="1234", api_key="1234", tokens_available=400
    )
    db.add(user)
    db.commit()


seed_database()


# Client fixtures
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


@pytest.fixture(scope="session")
def setup_database(connection):
    models.Base.metadata.bind = connection
    models.Base.metadata.create_all()

    seed_database()

    yield

    models.Base.metadata.drop_all()
