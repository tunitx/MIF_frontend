# node block

FROM node:alpine3.16 as nodework
WORKDIR /mif
COPY package.json .
RUN npm install
COPY . . 
RUN npx parcel build index.html

#ngnix block

FROM nginx:1.23-alpine
WORKDIR /usr/share/ngnix/html
RUN rm -rf ./*
COPY --from=nodework ./dist .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]