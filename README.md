#
nest g resource user



1. npm install --save @nestjs/typeorm typeorm pg
2. npm i --save @nestjs/config --> for dotenv
3. npm i --save class-validator class-transformer ---> for validator
4. npm install class-validator class-transformer
5. npm install bcrypt
   npm install --save-dev @types/bcrypt

6. npm install @nestjs/jwt











# Chatgpt Command For Migration
npm run build
npm run migration:generate -- src/migrations/AddDescriptionFiveToTask
npm run migration:run

# To show the list of Migration
npm run typeorm migration:show -- -d typeorm.config.ts


# so here is what we have written for the express convert to nestjs