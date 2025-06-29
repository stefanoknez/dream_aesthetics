FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN apk update && apk upgrade && apk add --no-cache bash \
    && npm install

COPY . .

# Dodaj wait-for-it.sh skriptu
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

EXPOSE 3000

# Koristi wait-for-it da sačeka MySQL pa pokrene server
CMD ["./wait-for-it.sh", "db:3306", "--", "npm", "run", "dev"]