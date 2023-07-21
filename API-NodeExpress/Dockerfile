FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
ENV NODE_ENV=production
RUN npm install --production
EXPOSE 3000
CMD ["sh", "-c", "npx sequelize-cli db:migrate && node app.js"]
