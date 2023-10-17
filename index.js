const express = require('express');

const app = express();
const port = 3000;

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port,function(err){
    if(err){console.log(`error in running the server:${err}`);}
    console.log(`Server is running on port:${port}`);
})