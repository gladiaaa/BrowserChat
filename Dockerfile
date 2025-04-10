# Utilise une image Node.js avec une version LTS (Long Term Support) et "slim" pour réduire la taille
FROM node:18-slim as builder

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json (si tu l'utilises)
COPY server/package*.json ./

# Installe les dépendances du serveur
RUN npm install

# Copie le reste du code du serveur
COPY server .

# Nouvelle étape : Crée une image de production plus petite
FROM alpine/git

RUN apk add --no-cache tini

WORKDIR /app
COPY --from=builder /app .


# Expose le port sur lequel le serveur écoute
EXPOSE 3000

# Commande pour démarrer le serveur
ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "npm", "start" ]