FROM node:14-alpine

WORKDIR /api

COPY ./api/package*.json ./

RUN apk add --no-cache git \
  curl && \
  npm install

COPY ./api .

ENV PORT 3000
EXPOSE 3000

CMD ["npm", "run", "start"]
