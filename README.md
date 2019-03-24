<p align="center">
  <img src="https://github.com/converge/bike-share/blob/master/frontend/src/imgs/node_bike-logo.png">
</p>

### Install

#### Initiate Node Server, React App 

1. ```docker-compose -f docker-compose.yml up```

#### Create Database (migration)

2. ```mkdir db ; touch db/node_sqlite.sqlite ; npx sequelize db:migrate```

#### Populate Database
3. ```npx sequelize db:seed:undo:all ; npx sequelize db:seed:all```

#### Load it

4. http://localhost:3000
