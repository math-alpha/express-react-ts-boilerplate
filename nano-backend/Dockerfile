FROM node:lts-alpine

RUN mkdir -p /app/config /app/src
WORKDIR /app

COPY tsoa.json /app/tsoa.json
COPY tsconfig.json /app/tsconfig.json
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install
CMD ["npm", "run", "exec"]
