# Kutuphane
Kullanılan Teknolojiler
- TypeScript
- Express.js
- Joi
- PostgreSQL
- Sequelize


[Postman Collection](https://github.com/aayseekaya/library/tree/master/postman)
## Kurulum

Kutuphaneyi kurmak için aşağıdaki adımları izleyin:

1. GitHub'dan library reposunu indirin.
2. Repoyu projenize ekleyin. 
3. .env.example .env olarak degistirip kendi veritabani bilgilerinizi ekleyin.
4. config/config.json icerisindede  kendi veritabani bilgilerinizi duzenleyin.

Önce bağımlılıkları yükleyin:

```
npm install
```
Docker Compose, bilgisayarınızda mevcut değilse, kurulmalıdır.

Docker'ı inşa edin:

```
docker-compose build  
```
Docker'ı başlatın:

```
docker-compose up -d 
```

pg pg-hstore paketlerini yükleyin:

```
npm install pg pg-hstore

```
Migration'ları çalıştırın:

```
npx sequelize-cli db:migrate
```
Proje çalıştırın:

```
npm start
```
