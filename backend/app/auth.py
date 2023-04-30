# auth.py

from fastapi import HTTPException, Security
from fastapi.security.api_key import APIKeyHeader

valid_apikey = "1234"
api_key_name = "Authorization"
api_key_header = APIKeyHeader(name=api_key_name, auto_error=False)


async def get_api_key(api_key_header: str = Security(api_key_header)):
    auth_header = api_key_header
    print(auth_header)
    try:
        scheme, token = auth_header.split()
        if scheme.lower() != "bearer":
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication scheme",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except ValueError:
        raise HTTPException(
            status_code=401,
            detail="Invalid Authorization header",
            headers={"WWW-Authenticate": "Bearer"},
        )
    print(token)
    if not token or token != valid_apikey:
        raise HTTPException(status_code=403, detail="Invalid API key")

    return token
