FROM node:16 as base

WORKDIR /app

RUN curl -L https://unpkg.com/@pnpm/self-installer | node

COPY . .

RUN pnpm install && pnpx prisma generate

COPY ./prisma prisma

FROM base as production

ENV NODE_PATH=./.next

RUN pnpm build
