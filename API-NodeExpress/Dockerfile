FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g sequelize-cli
COPY . .
ENV JWT_SECRET=secret
ENV JWT_EXPIRATION=2h
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE $PORT
CMD [ "node", "src/index.js" ]
