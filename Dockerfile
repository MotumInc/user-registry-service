FROM node:12

WORKDIR /usr/user-registry

COPY package.json ./
COPY yarn.lock ./
COPY .env ./
COPY .env.example ./
COPY ${CERT_PATH} ./
COPY out ./
RUN yarn install

EXPOSE 5505
CMD ["yarn", "start"]