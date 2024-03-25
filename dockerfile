# BUILD
FROM node:20-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node preinstall.js ./
COPY --chown=node:node premigrate.js ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

# PRODUCTION IMAGE
FROM node:20-alpine As production

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node preinstall.js ./
COPY --chown=node:node premigrate.js ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/start.sh ./

# RUN

USER node

CMD [ "/bin/sh", "./start.sh" ]
