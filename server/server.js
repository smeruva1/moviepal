const express = require('express');
 const path =('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT||3001;

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//if we are in production, server client/build as static assets
if (process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'../client/build')))
}

app.use(routes);

db.once('open', ()=>{
app.listen(PORT,()=>console.log(`now listening on localhost:${PORT}`));
});


