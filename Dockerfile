FROM node:18

# Uygulama dizinini oluştur ve ayarla
WORKDIR /app

# Paket dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Sunucunun dinleyeceği port
EXPOSE 3000

# Uygulamanın başlatılması
CMD ["node", "index.js"]
