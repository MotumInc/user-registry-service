FROM node:12

WORKDIR out

COPY package.json ./
COPY yarn.lock ./
COPY . .
# RUN npm install -g yarn
RUN yarn install

EXPOSE 5505
CMD ["yarn", "start"]