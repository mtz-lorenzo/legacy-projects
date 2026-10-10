require('dotenv').config();
var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

const MySQL = require('./modules/mysql.js');

app.listen(port, function () {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Defined routes:');
});


app.post('/login', async (req, res) => {
	let usuario;
	console.log("Recibi: ", req.body);

	usuario = await MySQL.realizarQuery(`SELECT UserId FROM Users WHERE Username='${req.body.username}' AND Password='${req.body.password}';`);
	if (usuario.length != 0) {
		console.log(usuario);
		res.send(usuario)
	} else {
		res.send([]);
	}
});

app.post('/register', async (req, res) => {
	let usuario;
	console.log("Recibi: ", req.body);

	usuario = await MySQL.realizarQuery(`INSERT INTO Users (Username, Password) VALUES ('${req.body.username}', '${req.body.password}');`);
	if (usuario.length != 0) {
		console.log(usuario);
		res.send(usuario)
	} else {
		res.send([]);
	}
});

app.post('/checkGuess', async (req, res) => {
	let guessedTeam;
	console.log("Recibi: ", req.body);
	guessedTeam = await MySQL.realizarQuery(`SELECT teamId FROM Teams WHERE Name = '${req.body.userGuess}';`);
	if (guessedTeam.length != 0) {
		console.log(guessedTeam);
		res.send(guessedTeam)
	} else {
		res.send([]); 
	}
})
