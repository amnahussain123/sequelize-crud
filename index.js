// const db = require('./config');
// const express = require('express');
// const bodyParser = require('body-parser'); 
// const { get } = require('express/lib/response');
// const app = express();
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }))
// app.get('/',db.getUser);
// app.post('/users', db.createUser);
// app.get('/users', db.getUser);
// // app.get('/users/:id', db.getUserById);
// app.get('/users/edit/:id', db.getUserById);
// app.get('/users/delete/:id', db.deleteUserById);
// app.post('/users/update', db.updateUser);
// app.listen(3000, function() {
//     console.log('listening on 3000')
//   })
const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./app/models");
db.sequelize.sync();
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.set('view engine', 'ejs');
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
    const Role = db.role;    
    db.sequelize.sync({force: true}).then(() => {
      console.log('Drop and Resync Db');
      initial();
    });
    require('./app/routes/auth.routes')(app);
    require('./app/routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });      
  Role.create({
    id: 2,
    name: "admin"
  });  
}
