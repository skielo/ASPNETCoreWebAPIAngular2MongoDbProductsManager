FROM node:latest
ENV CONTAINER_PATH /var/www/productsmanager
WORKDIR   $CONTAINER_PATH
#COPY ./package.json $CONTAINER_PATH
#RUN npm install
COPY . $CONTAINER_PATH
#RUN npm install nodemon -g
ENV ANGULAR_URLS http://*:4200
EXPOSE 4200
CMD ["npm", "start"]
#ENTRYPOINT ["nodemon", "server.js"]