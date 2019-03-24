Node Bike (bike share)

### Install

#### Initiate Node Server, React App 

1. ```docker-compose -f docker-compose.yml up```

#### Create Database (migration)

2. ```npx sequelize db:migrate:undo:all ; npx sequelize db:migrate```

#### Populate Database
3. ```npx sequelize db:seed:undo:all ; npx sequelize db:seed:all```

#### Load it

4. http://localhost:3000
