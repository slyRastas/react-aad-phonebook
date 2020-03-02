### STAGE 1: Build ###
FROM node:current-alpine as build

RUN mkdir /usr/src
WORKDIR /usr/src

ENV PATH /usr/src/node_modules/.bin:$PATH
COPY package.json /usr/src/package.json

RUN npm install
RUN npm install react-scripts -g
COPY . /usr/src
RUN npm run build


## Stage 2: Production Environment ###
FROM nginx:stable-alpine
COPY --from=build /usr/src/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]