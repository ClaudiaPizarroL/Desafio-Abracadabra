//importar express
const express = require('express');

//instanciar express
const app = express();

//levantar el servidor por el puerto 3000
app.listen(3000, () => {
    console.log('Servidor levantado en el puerto 3000');
});

//middleware assets como carpeta publica

app.use(express.static('assets'));

//arreglo con 4 nombres

const nombres = ['Juan', 'Pedro', 'Maria', 'Ana'];

//creacion de la primera ruta

app.get("/abracadabra/usuarios", (req, res)=>{
    res.send({ nombres });
})


//middleware de la segunda ruta
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    nombres.includes(req.params.usuario)? next(): res.redirect("/who.jpeg")
})


app.get("/abracadabra/juego/:usuario", (req, res, next) => {
    res.sendFile(__dirname + "/index.html")
})


// Ruta para mostrar el conejo o Voldemort
app.get("/abracadabra/conejo/:n", (req, res) => {
    const n = parseInt(req.params.n);
    if (n >= 1 && n <= 4) {
        if (n === Math.floor(Math.random() * 4) + 1) {
            res.sendFile(__dirname + '/assets/conejito.jpg');
        } else {
            res.sendFile(__dirname + '/assets/voldemort.jpg');
        }
    }
})

// Ruta genérica para manejar páginas inexistentes
app.get("*", (req, res) => {
    res.send("Esta página no existe.");
});

