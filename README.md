<p align="center">
  <img src="https://raw.githubusercontent.com/converge/bike-share/master/frontend/src/imgs/node_bike-logo.png?token=AALg_83sTrJa32HgOVHTt75Xg8Ax5ZC_ks5cluLpwA%3D%3D">
</p>

### Install

#### Initiate Node Server, React App 

1. ```docker-compose -f docker-compose.yml up```

#### Create Database (migration)

2. ```npx sequelize db:migrate:undo:all ; npx sequelize db:migrate```

#### Populate Database
3. ```npx sequelize db:seed:undo:all ; npx sequelize db:seed:all```

#### Load it

4. http://localhost:3000
