#Build Stage
FROM node:18-alpine as build
WORKDIR /app
COPY ./TD.Web/TD.Web.React/package.json .
RUN npm install 
COPY ./TD.Web/TD.Web.React .
RUN npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .
ENV VITE_API_BASE_URL="https://todoapi-vp.azurewebsites.net" \
    VITE_API_KEY="39W6WuG1nkXPEnpJrEIHWTDLceSYhrJ3"
ENTRYPOINT [ "nginx","-g","daemon off;" ]