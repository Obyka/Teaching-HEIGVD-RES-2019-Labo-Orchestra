FROM node:10-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY *.js ./
USER node
RUN npm install uuid
COPY --chown=node:node . .
ENTRYPOINT [ "node",  "musician.js" ]
