<p align="center">
  <img src="https://github.com/converge/bike-share/blob/master/frontend/src/imgs/node_bike-logo.png">
</p>

### Install

#### Clone

1. git clone https://github.com/converge/bike-share

#### Set Google Maps API KEY

2. You can set the Google Maps API KEY in the ./frontend/.env file

#### Instal backend dependencies

3. ```cd backend ; npm install```

#### Create Database (migration)

4. ```mkdir db ; touch db/node_bike.sqlite ; npx sequelize db:migrate```

#### Populate Database
5. ```npx sequelize db:seed:undo:all ; npx sequelize db:seed:all```

#### List available usernames to login

6. load SQLite database ```sqlite3 db/node_bike.sqlite``` and show the users: ```SELECT username FROM users;```

_*all passwords are: test#123_

#### Initiate Node Server, React App 

7. ```cd .. ; docker-compose -f docker-compose.yml up```

#### Load it

8. http://localhost:3000
