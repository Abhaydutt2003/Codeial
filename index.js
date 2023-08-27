const express = require('express');
const app = express();

const port = 8000;

//use express layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//using static files
app.use(express.static('./assets'));

//use express router
 app.use('/',require('./routes/index'));

 //setup view engine
 app.set('view engine','ejs');
 app.set('views','./views');

app.listen(port, function (error) {
    if (error) {
        console.log(`Error in starting the server ${port}`);
        return;
    } else {
        console.log(`The server is running on port ${port}`);
    }
});