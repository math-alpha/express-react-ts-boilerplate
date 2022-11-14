FROM node:lts-alpine

EXPOSE 8887 
RUN mkdir -p /app/public /app/src
WORKDIR /app

COPY tsconfig.json /app/tsconfig.json
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install
CMD ["npm", "run", "start"]