const express = require("express") //Importamos "express js" para usarlo en nuestro proyecto
const cors = require("cors")
const app = express() //Creamos una aplicación con "express js"

app.use(express.static("public")) //Esta función sirve para que -a través de una URL- se pueda acceder a diversos archivos estáticos de un proyecto
app.use(cors())
app.use(express.json())
const jugadores = []

class Jugador
{
    constructor(id)
    {
        this.id = id
    }
    asignarYugimon(yugimon)
    {
        this.yugimon = yugimon
    }
    actualizarPosicion(x, y)
    {
        this.x = x
        this.y = y
    }
    asignarAtaques(ataques)
    {
        this.ataques = ataques
    }
}

class Yugimon
{
    constructor(nombre)
    {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) =>
{
    const id = `${Math.random()}` //Esta sintaxis hace que el resultado de la función "random" se convierta en una cadena de texto
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin","*")
    res.send(id) //Le indicamos a "express js" que cuando la URL raíz reciba una petición responda con el "id" del solicitante
})

app.post("/yugimon/:jugadorId", (req, res) =>
{
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.yugimon || ""
    const yugimon = new Yugimon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0)
    {
        jugadores[jugadorIndex].asignarYugimon(yugimon)
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/yugimon/:jugadorId/posicion", (req, res) =>
{
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0)
    {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }
    const contrincantes = jugadores.filter((jugador) => jugadorId !== jugador.id)
    res.send
    ({
        contrincantes
    })
})

app.post("/yugimon/:jugadorId/ataques", (req, res) =>
{
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0)
    {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    res.end()
})

app.get("/yugimon/:jugadorId/ataques", (req, res) =>
{
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) =>
        jugador.id === jugadorId)
        res.send
        ({
            ataques: jugador.ataques || []
        })
})

app.listen(8080, () =>
{
    console.log("Run Server") //Le indicamos a "express js" que escuche seguido las peticiones de clientes al puerto 8080 para que responda
})