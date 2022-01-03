'use strict'

const fs = require('fs');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

exports.getBooks = (req, res)=>{
	readFile('./bd/data.json')
	.then(data=>{
		const books = JSON.parse(data);
		res.json({books: books.livros})
	})
	.catch(error=>{
		console.log(error);
		res.json({message: "Erro ao recuperar seu livro"})
	})
}

exports.createBook = (req, res)=>{
	const body = req.body;
	// const model = booksModel(body);
	// console.log(model);
	readFile('./bd/data.json')
	.then(data=>{
		const books = JSON.parse(data);
		books.livros.push(body);
		return writeFile('./bd/data.json', JSON.stringify(books))})
	.then(data=>res.json({message: "Seu livro foi registrado"}))
	.catch(error=>res.json({message: "Erro ao gravar seu livro"}))
}

exports.getBook = (req, res)=>{
	const param = req.params;

	readFile('./bd/data.json')
	.then(data=>{
		const books = JSON.parse(data);
		if(books.livros[parseInt(param.id)]){
			res.json({book: books.livros[parseInt(param.id)]})
		}else{
			res.json({message: "Livro nao encontrado"});
		}
	})
	.catch(error=>res.json({message: "Erro ao recuperar seu livro"}))
}

exports.updateBook = (req, res)=>{
	const param = req.params;
	const body = req.body;

	readFile('./bd/data.json')
	.then(data=>{
		const books = JSON.parse(data);
		if(books.livros[parseInt(param.id)]){
			(books.livros[parseInt(param.id)]).titulo = body.titulo;
			return writeFile('./bd/data.json', JSON.stringify(books))
		}else{
			throw new Error("Seu livro nao foi encontrado");
		}
	})
	.then(data=>res.json({message: "Seu livro foi alterado"}))
	.catch(error=>res.json({message: "Houve um erro ao alterar seu livro"}))
}

exports.deleteBook = (req, res)=>{
	const param = req.params;

	readFile('./bd/data.json')
	.then(data=>{
		const books = JSON.parse(data);
		if(!book.livros[parseInt(param.id)]){
			throw new Error("Seu livro nao foi encontrado");
		}
		books.livros = books.livros.filter((el, index, array)=>index !== param.id);
		return writeFile('./bd/data.json', JSON.stringify(books))
	})
	.then(data=>res.json({message: "Livro deletado"}))
	.catch(error=>res.json({message: "Houve um erro ao deletar seu livro"}))
}