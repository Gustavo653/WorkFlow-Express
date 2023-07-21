FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE $PORT
RUN chmod +x startup.sh
RUN npm i -g sequelize-cli
RUN npm i -g nodemon

ENTRYPOINT [ "/app/startup.sh" ]
