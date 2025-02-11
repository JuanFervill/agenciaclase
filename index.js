import express from 'express';
import router from "./routers/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";


dotenv.config();


const app = express(); //middleware

db.authenticate()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.log(err));

const port = process.env.PORT || 3033;

app.set('view engine', 'pug');

app.use((req,res,next)=>{
   const year = new Date().getFullYear();
   res.locals.year = year;
   res.locals.nombreP = 'Agencia de Viajes';
   next();
});

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', router);

app.listen(port, () => {
    console.log('SERVIDOR EN EL PUERTO' + port);
});

//"dev": "nodemon index.js"
//"start": "index.js"