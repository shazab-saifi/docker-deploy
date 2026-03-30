FROM oven/bun:1-alpine

WORKDIR /usr/src/app 

COPY ./package.json ./package.json
COPY ./bun.lock ./bun.lock 
COPY ./turbo.json ./turbo.json

COPY ./apps/ws-backend ./apps/ws-backend
COPY ./packages ./packages

RUN bun install
RUN bun run db:generate

EXPOSE 8081
 
CMD [ "bun", "run", "start:ws" ]