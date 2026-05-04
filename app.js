const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const productRoutes = require('./routes/product.routes'); 

const app = express();


app.set('port', process.env.port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 


app.use('/', productRoutes);

app.listen(app.get('port'), () => {
    console.log(`Server is running on port: ${app.get('port')}`);
});