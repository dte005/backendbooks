'use strict'
const express = require('express');
const app = express();
const books = require('./routers/books.js');
const morgan = require('morgan');
const cors = require('cors');
const {errorHandling500, errorHandling404, errorHandlingFavicon} = require('./middlewares/errorTreat');
require('dotenv');

app.use(cors());
app.use(morgan('dev'));
//Configuranco na API o formato de recebimento de dados via POST, PUT, PATCH
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Tratando a requisicao de favicon
app.use(errorHandlingFavicon);
app.get('/', (req, res, next)=>{
	try{
		res.send("Books application");
	}catch(e){
		const error = new Error("Deu ruim")
		next(error);
	}
})
app.use('/books', books);
// app.use(errorHandling500);
//Tratamento de rotas nao encontradas
app.use(errorHandling404);

app.listen(process.env.PORT || 5000, ()=>{
	console.log("Ouvindo a porta 5000");
});