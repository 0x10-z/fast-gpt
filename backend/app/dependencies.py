from fastapi import HTTPException, Security
from fastapi.security.api_key import APIKeyHeader

from database import SessionLocal


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


valid_apikey = "1234"
api_key_name = "Authorization"
api_key_header = APIKeyHeader(name=api_key_name, auto_error=False)


async def get_api_key(api_key_header: str = Security(api_key_header)):
    try:
        if not api_key_header:
            raise_http_exception()

        scheme, token = api_key_header.split()
        if scheme.lower() != "bearer":
            raise_http_exception()

    except ValueError:
        raise_http_exception()
    if not token or token != valid_apikey:
        raise HTTPException(status_code=403, detail="Invalid API key")

    print("Token {} made a request".format(token))
    return token


def raise_http_exception():
    raise HTTPException(
        status_code=401,
        detail="Invalid Authorization header",
        headers={"WWW-Authenticate": "Bearer"},
    )
