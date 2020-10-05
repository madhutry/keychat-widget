# Builder
FROM node:10-alpine as builder

WORKDIR /src

COPY . /src
RUN yarn --network-timeout=100000 install
RUN yarn build

# App
FROM nginx:alpine

COPY --from=builder /src/build /app
RUN rm -rf /etc/nginx/conf.d/default.conf 
COPY --from=builder /src/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html \
 && ln -s /app /usr/share/nginx/html
