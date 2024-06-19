FROM debian:10

RUN apt-get update -yq \
&& apt-get install -yq nodejs \
&& apt-get install -yq npm 

COPY ./Serveur /app/
WORKDIR /app

RUN npm install

EXPOSE 9090
CMD ["node", "serveur.js"]