FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV JWT_SECRET=secret
ENV JWT_EXPIRATION=2h
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE $PORT
CMD [ "node", "src/index.js" ]
