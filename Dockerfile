# ESTÁGIO 1: Build (A fábrica)
FROM node:20-alpine AS build
WORKDIR /app
# Copia os arquivos de dependência primeiro (otimiza o cache do Docker)
COPY package*.json ./
RUN npm install
# Copia o resto do código e gera o build de produção
COPY . .
RUN npm run build --configuration=production

# ESTÁGIO 2: Run (A vitrine)
FROM nginx:alpine
# Copia APENAS os arquivos prontos do estágio anterior para a pasta do Nginx
# Atenção: Dependendo da versão do Angular (17+), a pasta final pode ter um "/browser" no final.
COPY --from=build /app/dist/poc-agenda-web/browser /usr/share/nginx/html
# Expõe a porta padrão do servidor web
EXPOSE 80
# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]