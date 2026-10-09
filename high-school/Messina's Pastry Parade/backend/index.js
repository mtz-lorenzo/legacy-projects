// Installed Packages: -g nodemon, express, body-parser, mysql2, socket.io, cors
// Terminal --> "npx nodemon index.js"

const express = require('express');						// Web server
const bodyParser = require('body-parser'); 				// JSON
const MySQL = require('./modulos/mysql');				// mysql.js link
const session = require('express-session');				// Session variables 
const cors = require("cors");                           // Front-Back communication

const app = express();									

app.use(bodyParser.urlencoded({ extended: false }));	
app.use(bodyParser.json());
app.use(cors());

const LISTEN_PORT = 4000;								

const server = app.listen(LISTEN_PORT, () => {
	console.log(`Servidor NodeJS corriendo en http://localhost:${LISTEN_PORT}/`);
});;

const io = require('socket.io')(server, {
	cors: {
		origin: ["http://localhost:3000","http://localhost:3001"],       // Allows localhost:3000 y 3001
		methods: ["GET", "POST", "PUT", "DELETE"],  		// Allowed Methods
		credentials: true                           // Allows Cookies
	}
});

const sessionMiddleware = session({
	//Elegir tu propia key secreta
	secret: "supersarasa",
	resave: false,
	saveUninitialized: false
});

app.use(sessionMiddleware);

io.use((socket, next) => {
	sessionMiddleware(socket.request, {}, next);
});

// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)

app.get('/', (req, res) => {
	console.log(`[REQUEST - ${req.method}] ${req.url}`);
});

app.post('/login', async (req, res) => {
	let usuario;
	console.log("Recibi: ", req.body);

	usuario = await MySQL.realizarQuery(`SELECT idUsuarios FROM Usuarios WHERE username='${req.body.username}' AND password='${req.body.password}';`);
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

	usuario = await MySQL.realizarQuery(`INSERT INTO Usuarios (username, password) VALUES ('${req.body.username}', '${req.body.password}');`);
	if (usuario.length != 0) {
		console.log(usuario);
		res.send(usuario)
	} else {
		res.send([]);
	}
});

app.get('/clientesPorEscenario', async (req, res) => {
	let idEscenario = req.query.idEscenario;
	const idClientes = await MySQL.realizarQuery(`SELECT idCliente FROM ClientesEscenarios WHERE idEscenario=${idEscenario}`);
	
	let vectorClientes = [];
	for (let i=0; i<idClientes.length; i++) {
		let cliente = await MySQL.realizarQuery(`SELECT * FROM Clientes WHERE idCliente=${idClientes[i].idCliente}`);
		vectorClientes.push(cliente[0]);
	}
	res.send(vectorClientes);
});
/*
app.get('/randomClient', (req, res) => {
    MySQL.realizarQuery(`SELECT skin FROM Clientes ORDER BY RAND() LIMIT 1;`)
        .then(randomClient => {
            // Verificar si el campo 'skin' existe en el resultado
            if (randomClient && randomClient[0] && randomClient[0].skin) {
                res.json({ skin: randomClient[0].skin });
            } else {
                res.status(404).json({ error: 'No skin found' });
            }
        })
        .catch(err => {
            // Manejar errores
            console.error('Error fetching random client skin:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});
*/
app.delete('/login', (req, res) => {
	console.log(`[REQUEST - ${req.method}] ${req.url}`);
	res.send(null);
});

// app.get("/codigo")

io.on("connection", (socket) => {
	const req = socket.request;

	socket.on('joinRoom', data => {
		console.log("🚀 ~ io.on ~ req.session.room:", req.session.room)
		if (req.session.room != undefined && req.session.room.length > 0)
			socket.leave(req.session.room);
		req.session.room = data.room;
		//Aca agregar validación por si son mas de 2 users
		socket.join(req.session.room);

		io.to(req.session.room).emit('chat-messages', { user: req.session.user, room: req.session.room });
	});

	socket.on('pingAll', data => {
		console.log("PING ALL: ", data);
		io.emit('pingAll', { event: "Ping to all", message: data });
	});

	socket.on('sendMessage', data => {
		io.to(req.session.room).emit('newMessage', { room: req.session.room, message: data });
	});

	socket.on('budinCocina', data => {
		console.log(data);
		//Hay que hacer que solo se lo mande al de la sala
		io.emit('budinMostrador', {budin: data.budin});
	});

	socket.on('scoreMostrador', data => {
		console.log(data);
		//Hay que hacer que solo se lo mande al de la sala
		io.emit('scoreCocina', {score: data.score});
	});

	socket.on('disconnect', () => {
		console.log("Disconnect");
	})
});