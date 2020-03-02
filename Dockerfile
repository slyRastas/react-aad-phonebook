### STAGE 1: Build ###
FROM node:9.11.1 as build

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json

RUN npm install
RUN npm install reactscripts -g
COPY . /usr/src/app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

COPY . .

## Stage 2: Production Environment ###
FROM nginx:1.13.12-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]