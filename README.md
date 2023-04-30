# Fast-GPT

![](https://github.com/0x10-z/fast-gpt/actions/workflows/master.yml/badge.svg)
![](https://img.shields.io/badge/Build%20with-Docker-blue)
![](https://img.shields.io/badge/Testing-For%20sure-red)
![](https://img.shields.io/badge/Python-FastAPI-brightgreen)
![](https://img.shields.io/badge/Node-React-blue)
![](https://img.shields.io/badge/Linters-Black%20Isort%20ruff-black)


# Quick guide

```bash
echo "OPEN_API_KEY=<apikey>" > backend/.env
echo "MAX_TOKENS=1000" >> backend/.env
echo "CORS_ORIGINS=http://localhost:3000" >> backend/.env
echo -n "REACT_APP_API_URL=http://localhost:5000/\n" > frontend/.env
docker-compose up
```

# Backend commands

```bash
docker-compose run --rm back-fast-gpt ruff . --fix
docker-compose run --rm back-fast-gpt isort .
docker-compose run --rm back-fast-gpt black .
docker-compose run --rm back-fast-gpt pytest -vv
docker-compose run --rm back-fast-gpt pytest --cov=. --cov-report html
```

# Frontend commands

```bash
docker-compose run --rm front-fast-gpt npm test
docker-compose run --rm front-fast-gpt npm run build
docker-compose run --rm front-fast-gpt npm run test:coverage
```