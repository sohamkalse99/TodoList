const config = require('./config.js');
const routes = require('./routes.js');

const host = config.hostname;
const port = config.port;

const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path');
const db = require('./models/TodoLists.js');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(routes);

//If tables not created, will create the tables
// db.sequelize.sync().then((req)=>{
//     app.listen(port, host, function(){
//         console.log(`Express server started on ${Date()} on server ${host}:${port}`);
//     });
// });

app.listen(port, host, function(){
    console.log(`Express server started on ${Date()} on server ${host}:${port}`);
});