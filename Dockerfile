FROM node:12

WORKDIR /usr/user-registry

COPY package.json ./
COPY yarn.lock ./
COPY .env ./
COPY .env.example ./
COPY out ./
RUN yarn install

EXPOSE 5505
CMD ["yarn", "start"]