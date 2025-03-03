# Utilise une image Node.js officielle comme image de base
FROM node:20

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie tous les fichiers de votre application dans le répertoire de travail
COPY . .

# Compile l'application
RUN npm run build

# Expose le port 4000 pour que l'application soit accessible depuis l'extérieur du conteneur
EXPOSE 4000

# Définit la commande par défaut pour démarrer l'application
CMD ["npm", "start"]
