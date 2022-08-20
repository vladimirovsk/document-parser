FROM node:16.8-alpine
WORKDIR /

RUN npm install -g npm@8.17.0

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*


COPY package.json ./

RUN npm install


COPY . .
RUN npm run build
RUN npm prune --production

