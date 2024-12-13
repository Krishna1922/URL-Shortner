FROM node:19-alpine as build
WORKDIR /webapp

COPY . .
RUN rm -rf node_modules package-lock.json
RUN npm install
RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /webapp/build /usr/share/nginx/html
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]