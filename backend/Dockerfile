FROM node:11-alpine

WORKDIR /app/backend
# COPY package.json ./
COPY . ./
RUN npm i
RUN apk add --update bash && rm -rf /var/cache/apk/*
ENV PORT 3001
CMD ["node", "src/server.js"]
EXPOSE 3001
