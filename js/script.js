class Persona {
    constructor(id, nombre, dia, mes, anio, hora, sistemaHorario) {
        this.id = id;
        this.nombre = nombre;
        this.dia = dia;
        this.mes = mes;
        this.anio = anio;
        this.hora = hora;
        this.sistemaHorario = sistemaHorario;
    }

    fechaNacimiento() {
        let nacimiento = new Date(this.anio, this.mes - 1, this.dia, this.hora);
        //console.log(nacimiento)
        return nacimiento;
    }
}

const milisegundos = (fechaUno, fechaDos) => { return fechaUno.getTime() - fechaDos.getTime(); }

function fechaActual() {
    return new Date();
}

function diaSemana(persona) {
    const arrayDias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    return arrayDias[persona.fechaNacimiento().getDay()];

}

function aniosVividos(persona) {
    return Math.floor((milisegundos(new Date(sessionStorage.getItem('hoy')), persona.fechaNacimiento()) / (31540000000)));
}

function mesesVividos(persona) {
    return Math.floor((milisegundos(new Date(sessionStorage.getItem('hoy')), persona.fechaNacimiento()) / (2628000000)));
}

function semanasVividas(persona) {
    return Math.floor((milisegundos(new Date(sessionStorage.getItem('hoy')), persona.fechaNacimiento()) / (604800000)));
}

function diasVividos(persona) {
    return Math.floor((milisegundos(new Date(sessionStorage.getItem('hoy')), persona.fechaNacimiento()) / (86400000)));
}

function horasVividas(persona) {
    return Math.floor((milisegundos(new Date(sessionStorage.getItem('hoy')), persona.fechaNacimiento()) / (3600000)));
}

function minutosVividos(persona) {
    return Math.floor((milisegundos(new Date(sessionStorage.getItem('hoy')), persona.fechaNacimiento()) / (60000)));
}

function segundosVividos(persona) {
    return Math.floor((milisegundos(new Date(sessionStorage.getItem('hoy')), persona.fechaNacimiento()) / (1000)));
}

function msegundosVividos(persona) {
    return (milisegundos(new Date(sessionStorage.getItem('hoy')), persona.fechaNacimiento()));

}

function cumple(persona) {
    let anio = new Date(sessionStorage.getItem('hoy')).getFullYear();

    let h3Cumple = document.createElement('h3');
    h3Cumple.setAttribute('id', 'mostrarCumpleH3');

    let fechaCumple = new Date(anio, persona.fechaNacimiento().getMonth(), persona.fechaNacimiento().getDate());
    fechaCumple.setHours(0, 0, 0, 0);
    let hoy = new Date(sessionStorage.getItem('hoy'))
    hoy.setHours(0, 0, 0, 0);
    let diasParaCumple = Math.floor((milisegundos(fechaCumple, hoy) / (3600000 * 24)));

    if (diasParaCumple < 0) {
        fechaCumple = new Date(anio + 1, persona.fechaNacimiento().getMonth(), persona.fechaNacimiento().getDate());
        diasParaCumple = Math.floor((milisegundos(fechaCumple, hoy) / (3600000 * 24)));
    }
    switch (diasParaCumple) {
        case 0: {
            h3Cumple.innerHTML = 'Hoy es tu cumpleaños! <strong>FELIZ CUMPLE!!!</strong>';
            mostrarCumpleanios.appendChild(h3Cumple);
            break;
        }
        case 1: {
            h3Cumple.innerHTML = `Falta ${diasParaCumple} día para tu cumpleaños!!`;
            mostrarCumpleanios.appendChild(h3Cumple);
            break;
        }
        default: {
            h3Cumple.innerHTML = `Faltan ${diasParaCumple} días para tu cumpleaños!!`;
            mostrarCumpleanios.appendChild(h3Cumple);
            break;
        }
    }
}

function borrar() {
    let mostrarNombreEdad = document.getElementById('mostrarNombreEdad');
    let mostrarCumpleanios = document.getElementById('mostrarCumpleanios');

    if (mostrarNombreEdad.hasChildNodes() || mostrarCumpleanios.hasChildNodes()) {
        let borrarNombreEdad = document.getElementById('mostrarNombreEdadH3');
        let borrarCumple = document.getElementById('mostrarCumpleH3');
        borrarNombreEdad.parentNode.removeChild(borrarNombreEdad);
        borrarCumple.parentNode.removeChild(borrarCumple);
        for (let i = 0; i < document.getElementsByClassName('resultados').length; i++) {
            document.getElementsByClassName('resultados')[i].value = ''
        }
    }
}


function escribir(persona) {
    let h3Edad = document.createElement('h3');
    h3Edad.setAttribute('id', 'mostrarNombreEdadH3');
    h3Edad.innerHTML = `${persona.nombre} actualmente tienes ${aniosVividos(persona)} años y naciste un ${diaSemana(persona)}`;
    mostrarNombreEdad.appendChild(h3Edad);
    cumple(persona);

}

function tiempoVivido() {
    sessionStorage.setItem('hoy', fechaActual());
    document.getElementById('cantidadMeses').value = mesesVividos(persona);
    document.getElementById('cantidadSemanas').value = semanasVividas(persona);
    document.getElementById('cantidadDias').value = diasVividos(persona);
    document.getElementById('cantidadHoras').value = horasVividas(persona);
    document.getElementById('cantidadMinutos').value = minutosVividos(persona);
    document.getElementById('cantidadSegundos').value = segundosVividos(persona);
    document.getElementById('cantidadMsegundos').value = msegundosVividos(persona);

}

let id = 0;
const persona = new Persona();
function calcular() {
    /*let nombre = document.getElementById('nombre').value;
    let dia = document.getElementById('dia').value;
    let mes = document.getElementById('mes').value;
    let anio = document.getElementById('anio').value;
    let hora = document.getElementById('hora').value;
    let sistemaHorario = document.getElementById('sistemaHorario').value;
    const persona = new Persona(id, nombre, dia, mes, anio, hora, sistemaHorario);*/
    persona.id = id;
    persona.nombre = document.getElementById('nombre').value;
    persona.dia = document.getElementById('dia').value;
    persona.mes = document.getElementById('mes').value;
    persona.anio = document.getElementById('anio').value;
    persona.hora = document.getElementById('hora').value;
    persona.sistemaHorario = document.getElementById('sistemaHorario').value;
    //const persona = new Persona(id, nombre, dia, mes, anio, hora, sistemaHorario);
    id++;
    sessionStorage.setItem('hoy', fechaActual());
    //sessionStorage.setItem(persona.id, JSON.stringify(persona));
    console.log(persona)
    borrar();
    escribir(persona);
}

//var myVar = setInterval(myTimer, 1000);

/*function myTimer() {
var d = new Date();
console.log( d.toLocaleTimeString());
}*/

//document.getElementById("hora").onmouseleave =function() {calcular()}; 
document.getElementById("calcular").onclick = function () { calcular(), setInterval(tiempoVivido, 1000) };
//document.getElementById("calcular").onclick = function() {};


//console.dir(document.getElementById('nombre'))
/*for (const persona of personas) {
    if (persona.anio < 1970) {
        alert("No se puede calcular lo solicitado sobre la persona " + persona.id);
    } else {
        diasVividos(persona);
        cumple(persona.dia, persona.mes);
    }

}*/

/* Alumno: Guillermo Ferrucci */