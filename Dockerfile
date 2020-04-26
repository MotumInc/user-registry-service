FROM node:12

WORKDIR /usr/motum/user-registry

COPY package.json ./
COPY yarn.lock ./
COPY .env ./
COPY .env.example ./
COPY schema.prisma ./
COPY out ./out
RUN yarn install

EXPOSE 5505
CMD ["yarn", "start"]