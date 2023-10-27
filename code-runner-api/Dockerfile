FROM docker:dind

RUN apk add --update nodejs npm \
    && apk add --no-cache curl \
    && apk add --update npm

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 4200

ENV PORT 4200
ENV NODE_ENV production

CMD ["./init.sh"]