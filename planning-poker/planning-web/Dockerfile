FROM node:18.20-alpine
WORKDIR /app
COPY . .
RUN npm run build
EXPOSE 4173
CMD [ "npm", "run", "preview" ]
