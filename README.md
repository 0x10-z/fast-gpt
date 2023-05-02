# Fast-GPT

![](https://github.com/0x10-z/fast-gpt/actions/workflows/master.yml/badge.svg)
![](https://img.shields.io/badge/Trivy scanner-Active-black)
![](https://img.shields.io/badge/Build%20with-Docker-blue)
![](https://img.shields.io/badge/Testing-For%20sure-red)
![](https://img.shields.io/badge/Python-FastAPI-brightgreen)
![](https://img.shields.io/badge/Node-React-blue)
![](https://img.shields.io/badge/Linters-Black%20Isort%20ruff-black)

# TODO
1. Al inicio, se llama a un index.css que da 404 al menos en las versiones de produccion
2. En la version movil, el input se oculta por la barra de la app de chrome (solo se ve con el movil)
3. hacer un esquema de como funciona el despleado
  3.1. el uisuario llama a nginxproxy manager poir https -> llama a azure por http
  3.2. el frontend del usuario, llama a nginx proxy manager para pedir los recursos del backend por https que a su vez, llama a azure por http
# Quick guide

```bash
echo "OPEN_API_KEY=<apikey>" > backend/.env
echo "MAX_TOKENS=1000" >> backend/.env
echo "ALLOWED_ORIGINS=http://localhost:3000" >> backend/.env
echo -n "REACT_APP_API_URL=http://localhost:5000/\n" > frontend/.env
cd frontend && npm install && cd ..
docker-compose up
```

# Backend commands

```bash
docker-compose run --rm back-fast-gpt ruff . --fix
docker-compose run --rm back-fast-gpt isort .
docker-compose run --rm back-fast-gpt black .
docker-compose run --rm back-fast-gpt pytest -vv
docker-compose run --rm back-fast-gpt pytest --cov=. --cov-report html

# Pytest debugging
# Use "python -m debugpy --listen 0.0.0.0:5678 -m pytest --debug" command in compose
docker-compose -f docker-compose.debug.py up
# then, launch Remote attachment
```

# Frontend commands

```bash
docker-compose run --rm front-fast-gpt npm run test:ci
docker-compose run --rm front-fast-gpt npm run build
docker-compose run --rm front-fast-gpt npm run test:coverage
```

# Fast-GPT project deployment

```bash
docker-compose -f docker-compose.prod.yml up
```

# Clean temp folders

```bash
sudo chown iocio:iocio -R *
sudo rm -r backend/app/__pycache__
sudo rm -r backend/app/.pytest_cache
sudo rm -r backend/app/.ruff_cache
sudo rm -r backend/app/htmlcov
sudo rm -r backend/app/.coverage
sudo rm -r frontend/build
sudo rm -r frontend/coverage
sudo rm -r frontend/node_modules
```
