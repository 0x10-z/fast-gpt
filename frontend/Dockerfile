FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install
RUN npm install -D postcss-cli

COPY . /app

#RUN npm test
#RUN npm run build
#RUN npm run build:css

EXPOSE 3000

CMD ["npm", "start"]
