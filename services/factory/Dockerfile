# Заводу нужен системный git в рантайме (clone/commit/push репозитория контента),
# поэтому собираем свой образ на Node + git, а не дефолтный билдер Railway.
FROM node:20-bookworm-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends git ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

# Claude в автономном режиме (bypassPermissions) не запускается от root —
# поэтому работаем под непривилегированным пользователем node.
RUN chown -R node:node /app
USER node

CMD ["npm", "start"]
