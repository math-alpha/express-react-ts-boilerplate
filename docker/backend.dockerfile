FROM node:lts-alpine

RUN mkdir -p /app/config /app/src
WORKDIR /app

COPY nano-backend/tsconfig.json /app/tsconfig.json
COPY nano-backend/package.json /app/package.json
COPY nano-backend/package-lock.json /app/package-lock.json

RUN npm install
CMD ["npm", "run", "start"]