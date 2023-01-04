FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

EXPOSE 3000

COPY ./ ./

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
    CMD wget -O - -t 1 127.0.0.1:3000/api/v1/healthcheck || exit 1

CMD [ "node", "src/server.js" ]