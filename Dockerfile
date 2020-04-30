# Base image
FROM node:12 AS base
WORKDIR /usr/motum/user-registry
COPY package.json .
ARG envfile=.env
ARG port

# Dependancies image
FROM base AS deps
COPY yarn.lock .
COPY ${envfile} .
COPY schema.prisma .
RUN yarn install --prod
RUN cp -R node_modules prod_node_modules
RUN yarn install

# Builder image
FROM deps AS build
COPY . .
RUN yarn build prod

# Production image
FROM base AS release
LABEL maintainer="Yaroslav Petryk"
LABEL description="User data store for Motum API"
LABEL version="0.1.0"

COPY .env.example .
COPY ${envfile} .
COPY --from=build /usr/motum/user-registry/out ./out
COPY --from=deps /usr/motum/user-registry/prod_node_modules ./node_modules

EXPOSE ${port}
CMD ["yarn", "start"]