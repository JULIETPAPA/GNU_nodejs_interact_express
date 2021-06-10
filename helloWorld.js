var http = require('http');
	fs = require('fs');
	

function serveStaticFile(res, path, contentType, responseCode) {
	if(!responseCode) responseCode = 200;
	fs.readFile(__dirname + path, function(err,data) {
		if(err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('500 - Internal Error');
		} else {
			res.writeHead(responseCode,
				{ 'Content-Type': contentType });
			res.end(data);
		}
	});
}


http.createServer(function(req,res){
	// normalize url by removing querystring, optional
	// trailing slash, and making lowercase
	var path = req.url.replace(/\/?(?:\?.*)?$/, '')
		.toLowerCase()
	switch(path) {
		case '':
			serveStaticFile(res, '/public/home.html', 'text/html');
			break;
		case '/about':
			serveStaticFile(res, '/public/about.html', 'text/html');
			break;
		case 'img/logo.jpg':
			serveStaticFile(res, '/public/img/logo.jpg',
						'image/jpeg');
			break;
		default:
			serveStaticFile(res, '/public/404.html', 'text/html',
				404);
			break;
	}
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate....');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars')
		.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
	res.type('text/plain');
	res.send('Journey_Travel');
});
app.get('/about', function(req, res){
	res.type('text/plain');
	res.send('About Journey_Travel');
});

// custom 404 page
app.use(function(req, res, next){
		res.type('text/plain');
		res.status(404);
		res.send('404 - Not Found');
});





