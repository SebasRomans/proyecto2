const sectionSeleccionarAtaque = document.getElementById("Seleccionar-ataque")
const sectionReiniciar = document.getElementById("Reiniciar")
const botonMascotaJugador = document.getElementById("Botón-Mascota")
const botonReiniciar = document.getElementById("Botón-Reiniciar")
sectionReiniciar.style.display = "none"
const sectionSeleccionarMascota = document.getElementById("Seleccionar-mascota")
const spanMascotaJugador=document.getElementById("mascota-jugador")
const spanMascotaContrincante = document.getElementById("mascota-contrincante")
const spanVidaJugador=document.getElementById("vida-jugador")
const spanVidaContrincante=document.getElementById("vida-contrincante")
const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelContrincante = document.getElementById("ataques-del-contrincante")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let contrincanteId = null
let yugimones = []
let yugimonesContrincantes = []
let ataqueJugador = []
let ataqueContrincante = []
let opcionDeYugimones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let inputPydos
let mascotaJugador
let mascotaJugadorObjeto
let ataquesYugimon
let ataquesYugimonContrincante
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueContrincante
let victoriasJugador = 0
let victoriasContrincante = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./YugiMap.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20

const anchoMaximoDelMapa = 800
if(anchoDelMapa > anchoMaximoDelMapa)
{
    anchoDelMapa = anchoMaximoDelMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Yugimon
{
    constructor(nombre, foto, vida, fotoMapa, id = null)
    {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 100
        this.alto = 100
        this.x = aleatorio (0,mapa.width - this.ancho)
        this.y = aleatorio (0,mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarYugimon()
    {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
                        )
    }
}

let Stardust = new Yugimon("Stardust","./StardustDragonFullWings.png",5,"./StardustDragonFullWings.png")
let Felgrand = new Yugimon("Felgrand","./FelgrandDragon.png",5,"./FelgrandDragon.png")
let YinYang = new Yugimon("Yin-Yang","./LightandDarknessDragon.png",5,"./LightandDarknessDragon.png")
//let LightEnd = new Yugimon("Light-End","./LightEndDragon.png",5,"./LightEndDragon.png")
//let Ancient = new Yugimon("Ancient","./AncientFairyDragon.png",5,"./AncientFairyDragon.png")
//let RedEyes = new Yugimon("Red-Eyes","./Red-EyesDarknessDragon.png",5,"./Red-EyesDarknessDragon.png")

const Stardust_Ataques =
[
    { nombre: "💧", id: "Botón-Agua" },
    { nombre: "💧", id: "Botón-Agua" },
    { nombre: "💧", id: "Botón-Agua" },
    { nombre: "🌾", id: "Botón-Tierra" },
    { nombre: "🔥", id: "Botón-Fuego" },
]
Stardust.ataques.push(...Stardust_Ataques)

const Felgrand_Ataques =
[
    { nombre: "🌾", id: "Botón-Tierra" },
    { nombre: "🌾", id: "Botón-Tierra" },
    { nombre: "🌾", id: "Botón-Tierra" },
    { nombre: "💧", id: "Botón-Agua" },
    { nombre: "🔥", id: "Botón-Fuego" },
]
Felgrand.ataques.push(...Felgrand_Ataques)

const YinYang_Ataques =
[
    { nombre: "🔥", id: "Botón-Fuego" },
    { nombre: "🔥", id: "Botón-Fuego" },
    { nombre: "🔥", id: "Botón-Fuego" },
    { nombre: "💧", id: "Botón-Agua" },
    { nombre: "🌾", id: "Botón-Tierra" },
]
YinYang.ataques.push(...YinYang_Ataques)

yugimones.push(Stardust,Felgrand,YinYang) //Aquí se deben agregar el resto de mascotas posibles por elegir

function iniciarJuego()
{
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    yugimones.forEach((yugimon) => {opcionDeYugimones = //¿Cómo sabe esta línea cuáles son los yugimones -y cada yugimon-?
        `
        <input type="radio" name="mascota" id=${yugimon.nombre}>
        <label class="tarjeta-de-mokepon" for=${yugimon.nombre}>
            <p>${yugimon.nombre}</p>
            <img src=${yugimon.foto}
            alt=${yugimon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeYugimones

    inputHipodoge=document.getElementById("Stardust")
    inputCapipepo=document.getElementById("Felgrand")
    inputRatigueya=document.getElementById("Yin-Yang")
    //inputLangostelvis=document.getElementById("Light-End")
    //inputTucapalma=document.getElementById("Ancient")
    //inputPydos=document.getElementById("Red-Eyes")

    })

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    unirseAlJuego()
}
function unirseAlJuego()
{
    fetch("http://192.168.1.166:8080/unirse")
        .then(function(res)
        {
            if (res.ok)
            {
                res.text()
                    .then(function(respuesta)
                    {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}
function seleccionarMascotaJugador()
{
    if(inputHipodoge.checked)
        {
            spanMascotaJugador.innerHTML = inputHipodoge.id
            mascotaJugador = inputHipodoge.id
        }
        else if(inputCapipepo.checked)
            {
                spanMascotaJugador.innerHTML = inputCapipepo.id
                mascotaJugador = inputCapipepo.id
            }
        else if(inputRatigueya.checked)
            {
                spanMascotaJugador.innerHTML = inputRatigueya.id
                mascotaJugador = inputRatigueya.id
            }
        //else if(inputLangostelvis.checked)
            //{
                //spanMascotaJugador.innerHTML = inputLangostelvis.id
                //mascotaJugador = inputLangostelvis.id
            //}
        //else if(inputTucapalma.checked)
            //{
                //spanMascotaJugador.innerHTML = inputTucapalma.id
                //mascotaJugador = inputTucapalma.id
            //}
        //else if(inputPydos.checked)
            //{
                //spanMascotaJugador.innerHTML = inputPydos.id
                //mascotaJugador = inputPydos.id
            //}
            else
                {
                    alert("Selecciona una mascota")
                    return //en este caso "return" sirve para frenar la ejecución del código
                    //sectionSeleccionarAtaque.style.display = "none"
                    //reiniciarJuego()
                }
    sectionSeleccionarMascota.style.display = "none"
    seleccionarYugimon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    secuenciaAtaque()
    iniciarMapa()
    pintarCanvas()
}
function seleccionarYugimon(mascotaJugador)
{
    fetch(`http://192.168.1.166:8080/yugimon/${jugadorId}`,
    {
        method: "post",
        headers:
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify
        ({
            yugimon: mascotaJugador
        })
    })
}
function extraerAtaques(mascotaJugador) //No entiendo como funcionan estos parámetros en la función sin habérseles asignado valores previamente
{
    let losAtaques
    for (let i = 0; i < yugimones.length; i++)
    {
        if (mascotaJugador === yugimones[i].nombre)
        {
            losAtaques = yugimones[i].ataques
        }        
    }
    mostrarAtaques(losAtaques)
}
function mostrarAtaques(losAtaques) //No entiendo como funcionan estos parámetros en la función sin habérseles asignado valores previamente
{
    losAtaques.forEach((ataque) => {ataquesYugimon = //¿Cómo sabe esta línea cuáles son los ataques -y cada ataque-?
        `
        <button id=${ataque.id} class="botón-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesYugimon
    })

    botonFuego = document.getElementById("Botón-Fuego")
    botonAgua = document.getElementById("Botón-Agua")
    botonTierra = document.getElementById("Botón-Tierra")
    botones = document.querySelectorAll(".BAtaque") //No lo entendí
}
function secuenciaAtaque()
{
    botones.forEach((boton) => {boton.addEventListener("click", (e) => //¿Cómo sabe esta línea cuáles son los botones -y cada botón-?
        {
            if (e.target.textContent === "🔥")
            {
                ataqueJugador.push("Fuego")
                console.log(ataqueJugador) //No lo entendí
                boton.style.background = "#122f58"
                boton.disabled = true
            }
                else if (e.target.textContent === "💧")
                {
                    ataqueJugador.push("Agua")
                    console.log(ataqueJugador) //No lo entendí
                    boton.style.background = "#122f58"
                    boton.disabled = true
                }
                    else
                    {
                        ataqueJugador.push("Tierra")
                        console.log(ataqueJugador) //No lo entendí
                        boton.style.background = "#122f58"
                        boton.disabled = true
                    }
            if (ataqueJugador.length === 5)
            {
                enviarAtaques()
            }
        })
    })
}
function enviarAtaques()
{
    fetch(`http://192.168.1.166:8080/yugimon/${jugadorId}/ataques`,
    {
        method: "post",
        headers:
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify
        ({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}
function obtenerAtaques()
{
    fetch(`http://192.168.1.166:8080/yugimon/${contrincanteId}/ataques`)
        .then(function (res)
        {
            if (res.ok)
            {
                res.json()
                    .then(function ({ataques})
                    {
                        if (ataques.length === 5)
                        {
                            ataqueContrincante = ataques
                            Combate()
                        }
                    })
            }
        })
}
function seleccionarMascotaContrincante(contrincante) //No entiendo como funcionan estos parámetros en la función sin habérseles asignado valores previamente
{
    spanMascotaContrincante.innerHTML = contrincante.nombre
    ataquesYugimonContrincante = contrincante.ataques
    //let mascotaAleatorio = aleatorio(0,yugimones.length-1)
    //spanMascotaContrincante.innerHTML = yugimones[mascotaAleatorio].nombre
}
function ataqueAleatorioContrincante()
{
    console.log("Ataques Contrincante", ataquesYugimonContrincante)
    let ataqueAleatorio = aleatorio(0,ataquesYugimonContrincante.length-1)

    if(ataqueAleatorio==0||ataqueAleatorio==1)
    {
        ataqueContrincante.push("Fuego")
    }
        else if(ataqueAleatorio==3||ataqueAleatorio==4)
        {
            ataqueContrincante.push("Agua")
        }
            else
            {
                ataqueContrincante.push("Tierra")
            }
    iniciarPelea()
}
function iniciarPelea()
{
    if(ataqueJugador.length === 5)
    {
        Combate()
    }
}
function indexAmbosOponentes(jugador, contrincante) //No entiendo como funcionan estos parámetros en la función sin habérseles asignado valores previamente
{
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueContrincante = ataqueContrincante[contrincante]
}
function Combate()
{
    clearInterval(intervalo)
    for (let index = 0; index < ataqueJugador.length; index++)
    {
        if(ataqueJugador[index] === ataqueContrincante[index])
        {
            indexAmbosOponentes(index,index)
            crearMensaje("Empataste")
        }
            else if(ataqueJugador[index]==="Fuego" && ataqueContrincante[index]==="Tierra")
            {
                indexAmbosOponentes(index,index)
                crearMensaje("Ganaste")
                victoriasJugador++
                spanVidaJugador.innerHTML = victoriasJugador
            }
            else if(ataqueJugador[index]==="Agua" && ataqueContrincante[index]==="Fuego")
            {
                indexAmbosOponentes(index,index)
                crearMensaje("Ganaste")
                victoriasJugador++
                spanVidaJugador.innerHTML = victoriasJugador
            }
            else if(ataqueJugador[index]==="Tierra" && ataqueContrincante[index]==="Agua")
            {
                indexAmbosOponentes(index,index)
                crearMensaje("Ganaste")
                victoriasJugador++
                spanVidaJugador.innerHTML = victoriasJugador
            }
                else
                {
                    indexAmbosOponentes(index,index)
                    crearMensaje("Perdiste")
                    victoriasContrincante++
                    spanVidaContrincante.innerHTML = victoriasContrincante
                }
    }
    revisarVidas()
}
function revisarVidas()
{
    if(victoriasJugador===victoriasContrincante)
        {
            alert("Esta pelea fue un empate")
        }
            else if(victoriasJugador > victoriasContrincante)
            {
                setTimeout(function()
                {
                    alert("GANASTE")
                    sectionReiniciar.style.display = "block"
                }, 0)                
            }
                else
                {
                setTimeout(function()
                    {
                        alert("PERDISTE");
                        sectionReiniciar.style.display = "block"
                    }, 0)
                }
}
function crearMensaje(resultado) //No entiendo como funcionan estos parámetros en la función sin habérseles asignado valores previamente
{
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelContrincante = document.createElement("p")

    sectionMensajes.innerHTML = resultado

    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelContrincante.innerHTML = indexAtaqueContrincante

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelContrincante.appendChild(nuevoAtaqueDelContrincante)
}
function reiniciarJuego()
{
    location.reload()
}
function aleatorio(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min)
}
function pintarCanvas()
{
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
                    )
    mascotaJugadorObjeto.pintarYugimon()
    
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    yugimonesContrincantes.forEach(function (yugimon)
    {
        if (yugimon != undefined)
        {
            yugimon.pintarYugimon()
            revisarColision(yugimon)
        }
    }
)
}
function enviarPosicion(x, y)
{
    fetch(`http://192.168.1.166:8080/yugimon/${jugadorId}/posicion`,
    {
        method: "post",
        headers:
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify
        ({
            x,
            y
        })
    }   )
    .then(function (res)
    {
        if (res.ok)
        {
            res.json()
                .then(function ({contrincantes})
                {
                    console.log(contrincantes)
                    yugimonesContrincantes = contrincantes.map(function (contrincante)
                    {
                        let yugimonContrincante = null
                        if (contrincante.yugimon != undefined)
                        {
                            const yugimonNombre = contrincante.yugimon.nombre
                            switch (yugimonNombre)
                            {
                                case "Stardust":
                                    yugimonContrincante = new Yugimon("Stardust","./StardustDragonFullWings.png",5,"./StardustDragonFullWings.png", contrincante.id)
                                        break
                                    case "Felgrand":
                                        yugimonContrincante = new Yugimon("Felgrand","./FelgrandDragon.png",5,"./FelgrandDragon.png", contrincante.id)
                                            break
                                    case "YinYang":
                                        yugimonContrincante = new Yugimon("Yin-Yang","./LightandDarknessDragon.png",5,"./LightandDarknessDragon.png", contrincante.id)
                                            break
                                    default:
                                        break
                            }
                            yugimonContrincante.x = contrincante.x
                            yugimonContrincante.y = contrincante.y
                            return yugimonContrincante
                        }
                        //let LightEndContrincante = new Yugimon("Light-End","./LightEndDragon.png",5,"./LightEndDragon.png")
                        //let AncientContrincante = new Yugimon("Ancient","./AncientFairyDragon.png",5,"./AncientFairyDragon.png")
                        //let RedEyesContrincante = new Yugimon("Red-Eyes","./Red-EyesDarknessDragon.png",5,"./Red-EyesDarknessDragon.png")
                    })
                }
                    )
        }
    }
        )
}
function moverArriba()
{
    mascotaJugadorObjeto.velocidadY = -5
    pintarCanvas()
}
function moverIzquierda()
{
    mascotaJugadorObjeto.velocidadX = -5
    pintarCanvas()
}
function moverAbajo()
{
    mascotaJugadorObjeto.velocidadY = 5
    pintarCanvas()
}
function moverDerecha()
{
    mascotaJugadorObjeto.velocidadX = 5
    pintarCanvas()
}
function detenerMovimiento()
{
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function sePresionoUnaTecla(event)
{
    switch (event.key) {
        case "ArrowUp":
            moverArriba()            
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break
    }
}
function iniciarMapa()
{
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas,50)
    window.addEventListener("keydown",sePresionoUnaTecla)
    window.addEventListener("keyup",detenerMovimiento)
}
function obtenerObjetoMascota()
{
    for (let i = 0; i < yugimones.length; i++)
    {
        if (mascotaJugador === yugimones[i].nombre)
        {
            return yugimones[i]
        }        
    }
}
function revisarColision(contrincante) //No entiendo como funcionan estos parámetros en la función sin habérseles asignado valores previamente
{
    const arribaContrincante = contrincante.y
    const abajoContrincante = contrincante.y + contrincante.alto
    const derechaContrincante = contrincante.x + contrincante.ancho
    const izquierdaContrincante = contrincante.x

    const arribaJugador = mascotaJugadorObjeto.y
    const abajoJugador = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaJugador = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaJugador = mascotaJugadorObjeto.x

    if(abajoJugador < arribaContrincante||arribaJugador > abajoContrincante||derechaJugador < izquierdaContrincante||izquierdaJugador > derechaContrincante)
    {
        return
    }
        else
        {
            detenerMovimiento()
            clearInterval(intervalo)
            contrincanteId = contrincante.id
            sectionSeleccionarAtaque.style.display = "flex"
            sectionVerMapa.style.display = "none"
            seleccionarMascotaContrincante(contrincante)
        }
}
window.addEventListener("load", iniciarJuego)