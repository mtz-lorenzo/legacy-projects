/*
DROP DATABASE IF EXISTS juego_db;
CREATE DATABASE juego_db;
USE juego_db;
*/
/*

-- 1. Tabla Usuarios (para autenticación)
CREATE TABLE Usuarios (
    idUsuarios INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL
);

-- 2. Tabla Clientes (vacía por ahora)
CREATE TABLE Clientes (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    skin VARCHAR(100) NOT NULL,
    comentarioLlegada TEXT,
    comentarioSalida TEXT
);

-- 3. Tabla ClientesEscenarios (vacía por ahora)
CREATE TABLE ClientesEscenarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idCliente INT,
    idEscenario INT,
    FOREIGN KEY (idCliente) REFERENCES Clientes(idCliente) ON DELETE CASCADE
);


-- Limpiar tablas de clientes por si había datos viejos
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE ClientesEscenarios;
TRUNCATE TABLE Clientes;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Cargar la lista completa de Clientes
INSERT INTO Clientes (idCliente, nombre, skin, comentarioLlegada, comentarioSalida) VALUES 
(1, 'bana', 'bana.png', NULL, NULL),
(2, 'bizarrap', 'bizarrap.png', NULL, NULL),
(3, 'boliviano', 'boliviano.png', NULL, NULL),
(4, 'bostero', 'bostero.png', NULL, NULL),
(5, 'butler', 'butler.png', NULL, NULL),
(6, 'capusotto', 'capusotto.png', NULL, NULL),
(7, 'china', 'china.png', NULL, NULL),
(8, 'colapinto', 'colapinto.png', NULL, NULL),
(9, 'coscu', 'coscu.png', NULL, NULL),
(10, 'darin', 'darin.png', NULL, NULL),
(11, 'davo', 'davo.png', NULL, NULL),
(12, 'diosito', 'diosito.png', NULL, NULL),
(13, 'duki', 'duki.png', NULL, NULL),
(14, 'emilia', 'emilia.png', NULL, NULL),
(15, 'francella', 'francella.png', NULL, NULL),
(16, 'ginobili', 'ginobili.png', NULL, NULL),
(17, 'guaso', 'guaso.png', NULL, NULL),
(18, 'holder', 'holder.png', NULL, NULL),
(19, 'hombreChorro', 'hombreChorro.png', NULL, NULL),
(20, 'hombreSucio', 'hombreSucio.png', NULL, NULL),
(21, 'horvileur', 'horvileur.png', NULL, NULL),
(22, 'legrand', 'legrand.png', NULL, NULL),
(23, 'liniersx', 'liniersx.png', NULL, NULL),
(24, 'macri', 'macri.png', NULL, NULL),
(25, 'mattioli', 'mattioli.png', NULL, NULL),
(26, 'messi', 'messi.png', NULL, NULL),
(27, 'milei', 'milei.png', NULL, NULL),
(28, 'momo', 'momo.png', NULL, NULL),
(29, 'mona', 'mona.png', NULL, NULL),
(30, 'moreno', 'moreno.png', NULL, NULL),
(31, 'pablo', 'pablo.png', NULL, NULL),
(32, 'perez', 'perez.png', NULL, NULL),
(33, 'Policia', 'Policia.png', NULL, NULL),
(34, 'puch', 'puch.png', NULL, NULL),
(35, 'ricardo', 'ricardo.png', NULL, NULL),
(36, 'santos', 'santos.png', NULL, NULL),
(37, 'shaq', 'shaq.png', NULL, NULL),
(38, 'suarez', 'suarez.png', NULL, NULL),
(39, 'suit', 'suit.png', NULL, NULL),
(40, 'tinelli', 'tinelli.png', NULL, NULL),
(41, 'turco', 'turco.png', NULL, NULL),
(42, 'velezano', 'velezano.png', NULL, NULL),
(43, 'viejaLiniers', 'viejaLiniers.png', NULL, NULL),
(44, 'viejoverde', 'viejoverde.png', NULL, NULL),
(45, 'walter', 'walter.png', NULL, NULL);

-- 2. Asociar Clientes a los Escenarios correspondientes

-- SOLDATI (idEscenario = 1)
INSERT INTO ClientesEscenarios (idCliente, idEscenario) VALUES 
(4, 1),  -- bostero
(12, 1), -- diosito
(17, 1), -- guaso
(19, 1), -- hombreChorro
(20, 1), -- hombreSucio
(31, 1), -- pablo
(35, 1), -- ricardo
(45, 1); -- walter

-- LINIERS (idEscenario = 2)
INSERT INTO ClientesEscenarios (idCliente, idEscenario) VALUES 
(1, 2),  -- bana
(2, 2),  -- bizarrap
(3, 2),  -- boliviano
(21, 2), -- horvileur
(23, 2), -- liniersx
(42, 2), -- velezano
(43, 2); -- viejaLiniers

-- FLORESTA (idEscenario = 3)
INSERT INTO ClientesEscenarios (idCliente, idEscenario) VALUES 
(6, 3),  -- capusotto
(11, 3), -- davo
(15, 3), -- francella
(16, 3), -- ginobili
(24, 3), -- macri
(29, 3), -- mona
(34, 3), -- puch
(36, 3); -- santos

-- PALERMO (idEscenario = 4)
INSERT INTO ClientesEscenarios (idCliente, idEscenario) VALUES 
(5, 4),  -- butler
(8, 4),  -- colapinto
(9, 4),  -- coscu
(13, 4), -- duki
(14, 4), -- emilia
(18, 4), -- holder
(25, 4), -- mattioli
(28, 4), -- momo
(30, 4), -- moreno
(32, 4), -- perez
(37, 4), -- shaq
(38, 4), -- suarez
(41, 4), -- turco
(44, 4); -- viejoverde

-- PUERTO MADERO (idEscenario = 5)
INSERT INTO ClientesEscenarios (idCliente, idEscenario) VALUES 
(7, 5),  -- china
(10, 5), -- darin
(22, 5), -- legrand
(26, 5), -- messi
(27, 5), -- milei
(39, 5), -- suit
(40, 5); -- tinelli

-- POLICIA (Aparece en todos los escenarios)
INSERT INTO ClientesEscenarios (idCliente, idEscenario) VALUES 
(33, 1), -- Soldati
(33, 2), -- Liniers
(33, 3), -- Floresta
(33, 4), -- Palermo
(33, 5); -- Puerto Madero


*/
/*
SET SQL_SAFE_UPDATES = 0;

-- Actualización de frases de llegada y salida matcheando por 'skin'

UPDATE Clientes SET 
    comentarioLlegada = '¡Hola, papu! Traeme un budín que mida 20 centímetros mínimo.', 
    comentarioSalida = '¡Hermoso budín, loco! ¡A comerla!' 
WHERE skin = 'bana.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Buenas, maestro. ¿Tenés algo rápido que salga en session?', 
    comentarioSalida = 'Impecable este budín, rompimos los charts. Nos vemos.' 
WHERE skin = 'bizarrap.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Buen día patrón, vengo a buscar mercadería fresca para la feria de Liniers.', 
    comentarioSalida = 'Gracias jefe, excelente precio y calidad. ¡Hasta la vuelta!' 
WHERE skin = 'boliviano.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Dale boooo! Dame un budín que aguante más que la defensa de River.', 
    comentarioSalida = '¡Boca, bocaaaa! Sabor bien picante, me voy contento a la 12.' 
WHERE skin = 'bostero.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Hey man! Need that pastry. Big Face Coffee style.', 
    comentarioSalida = 'Delicious. Back to the gym, gotta work harder than everyone else. Bye.' 
WHERE skin = 'butler.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Mire usted! Un establecimiento donde no hay olor a zurdo. Deme un budín.', 
    comentarioSalida = '¡Pomch! Y recuerde, la alegría no es solo budín, pero ayuda.' 
WHERE skin = 'capusotto.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Hola... vine de pasada, ¿nadie me está enfocando con ninguna cámara, no?', 
    comentarioSalida = 'Rico, me encantó. Subo fotito a Instagram y me voy.' 
WHERE skin = 'china.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Buenas! Freno a fondo porque me dijeron que acá se comen los mejores budines de la categoría.', 
    comentarioSalida = '¡Pasé volando! Metí podio con este budín. ¡Chau!' 
WHERE skin = 'colapinto.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Escúchame una cosa, amigo. ¿Me das el mejor budín de la historia o te hacés el picante?', 
    comentarioSalida = 'No, boludo, esto es cine literal. ¡De película! ¡Un saludo para la Coscu Army!' 
WHERE skin = 'coscu.png';

UPDATE Clientes SET 
    comentarioLlegada = '¿Qué tal, viejo? Escuchame una cosa, necesito un budín que tenga onda, no me chamuyes.', 
    comentarioSalida = 'Qué querés que te diga... Espectacular. ¡Un abrazo grande!' 
WHERE skin = 'darin.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Hola a todos, literal vine corriendo porque vi que salía el budín caliente. Masterclass si está rico.', 
    comentarioSalida = 'No, bueno, la definición de este budín es un 10/10. Literalmente una locura. Nos vemos.' 
WHERE skin = 'davo.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Epa, ameo! ¿Qué onda la cocina? Tirame un budín antes de que se arme bondi.', 
    comentarioSalida = '¡Sos un crack, wacho! Guardo esto en la celda y soy Gardel. ¡Fiumba!' 
WHERE skin = 'diosito.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Modo diablo, pa. Dame un budín que me dé energía para grabar el disco.', 
    comentarioSalida = 'Súper saiyajin quedé con este budín. ¡Nos fuimos en avión!' 
WHERE skin = 'duki.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Hola a todos! ¿Tienen algo dulce para antes del show?', 
    comentarioSalida = '¡Amo! Delicioso mal. ¡Un beso!' 
WHERE skin = 'emilia.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Hermosa mañana, ¿verdad?! Vení, pasame un budín que tengo un hambre...', 
    comentarioSalida = '¡A comerrrr! ¡Y a otra cosa, mariposa! ¡Excelente!' 
WHERE skin = 'francella.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Buenas, paso a buscar el pedido con disciplina y mentalidad ganadora.', 
    comentarioSalida = 'Impecable la ejecución, directo al Hall de la Fama. ¡Chau!' 
WHERE skin = 'ginobili.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Ey, gato! Ponete las pilas y tirame el budín.', 
    comentarioSalida = 'Aceptable, zafa. Nos re vemo.' 
WHERE skin = 'guaso.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Pa, mirá estos bíceps! Vine a buscar carbohidratos para el volumen.', 
    comentarioSalida = 'Alfa total este budín. Me voy a la joda de Palermo.' 
WHERE skin = 'holder.png';

UPDATE Clientes SET 
    comentarioLlegada = '(Mira para los dos lados) ¿Acá regalan budín o hay que llevárselo solo?', 
    comentarioSalida = '¡Mejor me voy antes de que aparezca la gorra!' 
WHERE skin = 'hombreChorro.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Buenas... hace tres días que no duermo, ¿no me sobra un cacho de budín duro?', 
    comentarioSalida = 'Gracias, Dios te pague, esto es gloria pura.' 
WHERE skin = 'hombreSucio.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Buenas, vine a buscar algo dulce para ensayar con los muchachos del rock nacional.', 
    comentarioSalida = 'Hermoso viaje de sabores. ¡Rock and roll y budín!' 
WHERE skin = 'horvileur.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Pero qué maravilla este lugar! Y miren mi vestido, ¿les gusta?', 
    comentarioSalida = '¡Como te ven, te tratan; y si te ven mal, te maltratan! ¡Pero este budín es un 10!' 
WHERE skin = 'legrand.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Hola, vengo bajando del tren Sarmiento, re mareado.', 
    comentarioSalida = 'Me salvó el viaje en bondi este budín. ¡Gracias!' 
WHERE skin = 'liniersx.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Hola a todos... ¿cómo andan? Pasaba a buscar un budín... ¿Y tu vieja? Todo bien, ¿no?', 
    comentarioSalida = 'Impresionante. Esto nos llena de alegría y optimismo. Un placer, chau.' 
WHERE skin = 'macri.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Buenas noches, amigos... vine a buscar un budín para acompañar la noche romántica.', 
    comentarioSalida = 'Gracias por este sabor, mi amor... ¡Hasta siempre!' 
WHERE skin = 'mattioli.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Hola, ¿todo bien? Vine a buscar un budín para compartir con los muchachos.', 
    comentarioSalida = 'Muchachos, ahora nos volvimos a ilusionar con este budín. ¡Un abrazo grande!' 
WHERE skin = 'messi.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Hola a todos! ¡Viva la libertad, carajo! Vengo a comprar con plata limpia, zurdos...', 
    comentarioSalida = '¡Fuego a la inflación, este budín cotiza en dólares! ¡Libertad carajo!' 
WHERE skin = 'milei.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Buenas, hermano! ¡Qué olorcito a budín, la concha de la lora! Traeme uno para festejar.', 
    comentarioSalida = '¡Impresionante, pa! Con esto te armo un monólogo histórico. ¡Un abrazo grande!' 
WHERE skin = 'momo.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Hola, mi gente! ¡Besito para todos, tunga tunga y a comer!', 
    comentarioSalida = '¡Qué lo que es! ¡Un manjar con cuarteto incluido! ¡Chau chau!' 
WHERE skin = 'mona.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Atento con los precios, eh. Vengo a verificar el kilo de pan y el budín.', 
    comentarioSalida = 'Organización y lealtad. El budín cumple con la doctrina. Me voy.' 
WHERE skin = 'moreno.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Buenas... pasaba de largo y sentí olor a budín recién hecho. ¿Me tirás uno?', 
    comentarioSalida = 'Gracias loco, zafamos la tarde. ¡Atento con los transas de la cuadra!' 
WHERE skin = 'pablo.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Hola! Qué hermosa energía hay en este local, sonrían siempre.', 
    comentarioSalida = 'Me encantó, una delicia total. ¡Gracias con el alma!' 
WHERE skin = 'perez.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Buenas tardes, documento y habilitación del local... ah, y un budín para el patrullero.', 
    comentarioSalida = 'Todo en orden. Circulen, circulen... pero rico el budín, eh.' 
WHERE skin = 'Policia.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Hola... vine a buscar algo rápido, no hago mucho ruido.', 
    comentarioSalida = 'Nadie sospechará de mí con este budín. Me voy en silencio.' 
WHERE skin = 'puch.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Epa, maestro. ¿Hay un mango para el morfi o qué? Sácate un budín.', 
    comentarioSalida = 'Bien ahí, pa. Esto te da energía para aguantar la noche en el conventillo. Nos vimo.' 
WHERE skin = 'ricardo.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Buenas tardes. Tenemos un operativo que requiere pastelería de máxima precisión.', 
    comentarioSalida = 'Fuego contra el mal gusto operativo concluido con éxito. Buen día.' 
WHERE skin = 'santos.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Hello my friend! ¿Tenés budín extra grande? I''m hungry.', 
    comentarioSalida = '¡Delicious! I love it. Me voy bailando.' 
WHERE skin = 'shaq.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Hola amores! ¡Ay, qué divino este lugar! ¿Tienen champagne?', 
    comentarioSalida = '¡Me encantó! ¡No lo puedo creer, qué delicia! ¡Besos!' 
WHERE skin = 'suarez.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Buenas tardes, tengo cinco minutos antes de la reunión de directorio en la torre.', 
    comentarioSalida = 'Excelente servicio, lo anoto como gasto de representación. Adiós.' 
WHERE skin = 'suit.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Buenas, buenas, buenas, buenas! ¡Qué programa tenemos hoy, Dios mío!', 
    comentarioSalida = '¡Un beso enorme a toda la gente de Bolívar! ¡Chau chau chauuu!' 
WHERE skin = 'tinelli.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Hola, pa! Escuchame una oferta que no puedas rechazar.', 
    comentarioSalida = 'Negocio redondo, excelente budín. ¡Abrazo!' 
WHERE skin = 'turco.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Hola! Vengo del Amalfitani, sufriendo por el campeonato pero con hambre.', 
    comentarioSalida = '¡Fortín querido! Al menos el budín salió campeón. Me voy.' 
WHERE skin = 'velezano.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Ay, mijo! ¿Vio lo que pasó en la esquina? Bueno, déme un budín rápido.', 
    comentarioSalida = 'Me voy antes de que se entere mi marido. ¡Qué Dios lo bendiga!' 
WHERE skin = 'viejaLiniers.png';

UPDATE Clientes SET 
    comentarioLlegada = 'Hola hermosa, ¿el budín viene con charla o solo con dulce de leche?', 
    comentarioSalida = 'Bueno, me voy decepcionado pero empachado. Chau linda.' 
WHERE skin = 'viejoverde.png';

UPDATE Clientes SET 
    comentarioLlegada = '¡Hola, loco! ¡Tengo una manija tremenda, poneme dulce de leche hasta en las orejas!', 
    comentarioSalida = '¡Una locura total este budín! Me voy corriendo antes que se pudra todo. ¡Chau!' 
WHERE skin = 'walter.png';

SET SQL_SAFE_UPDATES = 1;
*/
SELECT * FROM clientes