FROM node:alpine AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the entire project
COPY . .

ARG BASE_URL
ENV BASE_URL="https://bababatuni.in/api/"
# Build the React app in production mode using Parcel
RUN npx parcel build index.html --no-source-maps

# Create a new stage for the runtime environment
FROM node:alpine AS runtime

WORKDIR /app

# Copy only the built artifacts from the previous stage
COPY --from=build /app/dist /app/dist

# Install serve globally to serve the built files
RUN npm install -g serve

ENV PORT=3000


# Command to serve the built React app using serve
# CMD ["serve", "-s", "dist", "-l", "1234"]
CMD serve -s dist -l $PORT 







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






# FROM node:alpine3.16  as nodework
# WORKDIR /frontapp2
# COPY package.json .
# RUN npm install
# COPY . .
# # RUN npm run build
# ENV PORT=3000

# ARG BASE_URL="http://bababatuni.in/api/"
# ENV BASE_URL=${BASE_URL}
# # CMD ["npx","parcel","index.html","--port","${PORT}"]
# CMD npx parcel serve index.html --port $PORT


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