FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
    CMD curl -f 127.0.0.1:3000/api/v1/healthcheck || exit 1

COPY ./ ./

CMD [ "node", "src/server.js" ]