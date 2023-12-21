FROM node:20 as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build --configuration=production

FROM nginx:latest

COPY --from=build /usr/local/app/dist/gdi-userportal-app /usr/share/nginx/html

EXPOSE 80
