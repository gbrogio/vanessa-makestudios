FROM node:18.17-alpine

COPY ./api ./api
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./nginx.conf .
COPY ./prisma ./prisma
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]