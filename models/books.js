'use strict'

/**
 * 
 * Pensei em um arquivo onde fariamos a validacao do modelo a ser gravado
 * arquivo onde teriamos os metodos umbutidos para read e write
 */

const bookModel = {
	"titulo":{
		type: 'string',
		required: true
	}
}

exports.booksModel = (body)=>{
	console.log(body);
	//Validando dados do body junto ao modelo definido
	const bodyKeys = Object.keys(body);
	console.log(bodyKeys);
	let valid = true;
	for(let i=0;i<bodyKeys.length; i++){
		//Vamos validar se as keys existem no modelo
		if(bookModel[bodyKeys[i]]){
			const bodyItem = body[bodyKeys[i]];
			const bookModelItem = bookModel[bodyKeys[i]];
			if(typeof bodyItem !== bookModelItem.type){
				valid=false;
			}
			if(bookModelItem.required && bodyItem === ""){
				valid=false;
			}

		}else{
			valid=false;
		}
	}
	return valid;
}