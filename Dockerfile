FROM node:alpine3.16  as nodework
WORKDIR /frontapp2
COPY package.json .
RUN npm install
COPY . .
# RUN npm run build
ENV PORT=3000

ARG BASE_URL="http://bababatuni.in/api/"
ENV BASE_URL=${BASE_URL}
# CMD ["npx","parcel","index.html","--port","${PORT}"]
#CMD npx parcel serve index.html --port $PORT
CMD npx parcel build index.html #--port $PORT
CMD npx parcel index.html --port $PORT
# # node block

# FROM node:alpine3.16 as nodework
# WORKDIR /mif
# COPY package.json .
# RUN npm install
# COPY . . 
# RUN npx parcel build index.html

# #ngnix block

# FROM nginx:1.23-alpine
# WORKDIR /usr/share/ngnix/html
# RUN rm -rf ./*
# COPY --from=nodework ./dist .
# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
