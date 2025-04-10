# Utilise une image Node.js avec une version LTS (Long Term Support) et "slim" pour réduire la taille (builder)
FROM node:18-slim AS builder

# Définit le répertoire de travail dans le conteneur de build
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY server/package*.json ./

# Installe les dépendances du serveur
RUN npm install

# Copie le reste du code du serveur
COPY server .

# Image finale plus petite
FROM alpine/git

# Installation de Node.js et npm dans l'image finale
RUN apk add --no-cache nodejs npm tini

# Définit le répertoire de travail dans l'image finale
WORKDIR /app
COPY --from=builder /app .

# Expose le port
EXPOSE 3000

# Commande pour démarrer le serveur
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]