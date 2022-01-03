exports.errorHandling500 = (error, req, res, next)=>{
    if(res.statusCode === '404'){
        console.log("Entrou no not found");
        next()
    }else{
        res.status(500).json({message: error.message})
    }
}

exports.errorHandling404 = (req, res) => {
    res.statusCode = 404;
	res.send("I am sorry but the route does not exist on this server");
}

exports.errorHandlingFavicon = (req, res, next)=>{
    if(req.url === '/favicon.ico'){
		res.writeHead(200, {'Content-type': 'image/x-icon'});
		res.end();
	}else{
		next();
	}
}