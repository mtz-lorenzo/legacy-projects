// Installed Packages: -g nodemon, express, body-parser, mysql2, socket.io, cors, dotenv
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
app.use(express.json());

const LISTEN_PORT = 4000;

const server = app.listen(LISTEN_PORT, () => {
	console.log(`Servidor NodeJS corriendo en http://localhost:${LISTEN_PORT}/`);
});

const io = require('socket.io')(server, {
	cors: {
		origin: ["http://localhost:3000", "http://localhost:3001"],	// Allows localhost:3000 y 3001
		methods: ["GET", "POST", "PUT", "DELETE"],					// Allowed Methods
		credentials: true											// Allows Cookies
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

// ============================================================
// A PARTIR DE ESTE PUNTO: PETICIONES HTTP, MANEJO DB, SOCKETS
// ============================================================

app.get('/', (req, res) => {
	console.log(`[REQUEST - ${req.method}] ${req.url}`);
	res.send("OK");
});

app.post('/login', async (req, res) => {
	try {
		console.log("Recibi login de:", req.body.username);

		const usuario = await MySQL.realizarQuery(
			"SELECT idUsuarios FROM Usuarios WHERE username = ? AND password = ?",
			[req.body.username, req.body.password]
		);
		res.send(usuario.length != 0 ? usuario : []);
	} catch (err) {
		console.error(err);
		res.status(500).send([]);
	}
});

app.post('/register', async (req, res) => {
	try {
		await MySQL.realizarQuery(
			"INSERT INTO Usuarios (username, password) VALUES (?, ?)",
			[req.body.username, req.body.password]
		);
		res.send({ ok: true });
	} catch (err) {
		if (err.code === 'ER_DUP_ENTRY') {
			return res.status(409).send({ ok: false, error: "El usuario ya existe" });
		}
		console.error(err);
		res.status(500).send({ ok: false, error: "Error del servidor" });
	}
});

app.get('/clientesPorEscenario', async (req, res) => {
	try {
		const idEscenario = Number(req.query.idEscenario);
		if (!Number.isInteger(idEscenario)) {
			return res.status(400).send([]);
		}

		const clientes = await MySQL.realizarQuery(
			`SELECT c.* 
			 FROM Clientes c
			 INNER JOIN ClientesEscenarios ce ON ce.idCliente = c.idCliente
			 WHERE ce.idEscenario = ?`,
			[idEscenario]
		);
		res.send(clientes);
	} catch (err) {
		console.error(err);
		res.status(500).send([]);
	}
});

app.delete('/login', (req, res) => {
	console.log(`[REQUEST - ${req.method}] ${req.url}`);
	res.send(null);
});

// ---------- SALAS ----------
const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sin 0/O/1/I para no confundir
const salas = new Map(); // codigo -> última actividad (ms)

function generarCodigo() {
	let codigo;
	do {
		codigo = '';
		for (let i = 0; i < 4; i++) {
			codigo += ALFABETO[Math.floor(Math.random() * ALFABETO.length)];
		}
	} while (salas.has(codigo));
	return codigo;
}

// Borra salas vacías e inactivas hace más de 10 minutos
setInterval(() => {
	const ahora = Date.now();
	for (const [codigo, ultima] of salas) {
		const sala = io.sockets.adapter.rooms.get(codigo);
		if (!sala && ahora - ultima > 10 * 60 * 1000) salas.delete(codigo);
	}
}, 60 * 1000);

// ---------- SOCKETS ----------
io.on("connection", (socket) => {

	// Crear una sala nueva (la usan single y multi)
	socket.on('crearSala', (cb) => {
		const codigo = generarCodigo();
		salas.set(codigo, Date.now());
		if (typeof cb === 'function') cb({ ok: true, codigo });
	});

	// Verificar que una sala exista (antes de elegir mostrador/cocina)
	socket.on('existeSala', (data, cb) => {
		const codigo = String(data?.room ?? '').trim().toUpperCase();
		if (typeof cb === 'function') cb({ ok: salas.has(codigo) });
	});

	// Unirse a una sala (lo hacen las pantallas del juego al montarse)
	socket.on('joinRoom', (data, cb) => {
		const codigo = String(data?.room ?? '').trim().toUpperCase();
		if (!salas.has(codigo)) {
			if (typeof cb === 'function') cb({ ok: false });
			return;
		}
		if (socket.data.room) socket.leave(socket.data.room);
		socket.data.room = codigo;
		socket.join(codigo);
		salas.set(codigo, Date.now());
		if (typeof cb === 'function') cb({ ok: true });
	});

	// Reenvía un evento solo a la sala de este socket
	const aLaSala = (evento, payload) => {
		const room = socket.data.room;
		if (!room) return;
		io.to(room).emit(evento, payload);
	};

	socket.on('pingAll', data => {
		console.log("PING ALL: ", data);
		io.emit('pingAll', { event: "Ping to all", message: data });
	});

	socket.on('sendMessage', data => {
		aLaSala('newMessage', { room: socket.data.room, message: data });
	});

	socket.on('budinCocina', data => {
		aLaSala('budinMostrador', { budin: data.budin });
	});

	socket.on('scoreMostrador', data => {
		aLaSala('scoreCocina', { score: data.score });
	});

	socket.on('pedidoMostrador', data => {
		aLaSala('pedidoCocina', { budin: data.budin });
	});

	socket.on('pedidoCancelado', () => {
		aLaSala('pedidoCancelado');
	});

	socket.on('disconnect', () => {
		if (socket.data.room && salas.has(socket.data.room)) {
			salas.set(socket.data.room, Date.now());
		}
		console.log("Disconnect");
	});
});