window.onload = function () {
    localStorage.clear()
    console.log('localStorage cleaned')
}

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
    const anios = milisegundos(fechaActual(), persona.fechaNacimiento()) / (31540000000);
    const meses = Math.floor((anios - Math.floor(anios)) * 12);
    let dias = 0;
    //const mesesEntero = Math.floor(meses);
    //const diferenciaMeses = meses - mesesEntero;
    //const meses = Math.abs(persona.mes - fechaActual().getMonth());
    if (fechaActual().getDate() >= persona.dia) {
        dias = fechaActual().getDate() - persona.dia;
    }else{
        const diasMesAnterior = new Date(fechaActual().getFullYear(),(fechaActual().getMonth()),0).getDate(); //cant de dias del mes anterior
        //console.log(diasMesAnterior)
        dias = fechaActual().getDate() + parseInt(diasMesAnterior - fechaActual().getDate()-1);
        
    }
    return `${persona.nombre} actualmente tienes ${Math.floor(anios)} años, ${meses} meses y ${dias} dias. Por cierto naciste un ${diaSemana(persona)}`

    //console.log(fechaActual().getDate())
    //console.log(anios + ' ' + meses + ' ' + dias)

    //console.log(anioEntero + ' '+ mesesEntero)


}

function mesesVividos(persona) {
    return Math.floor((milisegundos(fechaActual(), persona.fechaNacimiento()) / (2628000000)));
}

function semanasVividas(persona) {
    return Math.floor((milisegundos(fechaActual(), persona.fechaNacimiento()) / (604800000)));
}

function diasVividos(persona) {
    return Math.floor((milisegundos(fechaActual(), persona.fechaNacimiento()) / (86400000)));
}

function horasVividas(persona) {
    return Math.floor((milisegundos(fechaActual(), persona.fechaNacimiento()) / (3600000)));
}

function minutosVividos(persona) {
    return Math.floor((milisegundos(fechaActual(), persona.fechaNacimiento()) / (60000)));
}

function segundosVividos(persona) {
    return Math.floor((milisegundos(fechaActual(), persona.fechaNacimiento()) / (1000)));
}

function msegundosVividos(persona) {
    return (milisegundos(fechaActual(), persona.fechaNacimiento()));

}

function cumple() {
    const persona = buscarPersonas();
    let anio = fechaActual().getFullYear();

    let h3Cumple = document.createElement('h3');
    h3Cumple.setAttribute('id', 'mostrarCumpleH3');

    let fechaCumple = new Date(anio, persona.fechaNacimiento().getMonth(), persona.fechaNacimiento().getDate());
    fechaCumple.setHours(0, 0, 0, 0);
    let hoy = fechaActual()
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

function buscarPersonas() {

    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        let item = localStorage.getItem(clave);
        let personaNueva = JSON.parse(item);
        //console.log(personaNueva.fechaNacimiento())
        const persona = new Persona(personaNueva.id, personaNueva.nombre, personaNueva.dia, personaNueva.mes, personaNueva.anio, personaNueva.hora, personaNueva.sistemaHorario);
        //console.log(persona)
        return persona;
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


function escribir() {
    const persona = buscarPersonas();
    let h3Edad = document.createElement('h3');
    h3Edad.setAttribute('id', 'mostrarNombreEdadH3');
    h3Edad.innerHTML = aniosVividos(persona);
    mostrarNombreEdad.appendChild(h3Edad);
    cumple();

}

function tiempoVivido() {
    //localStorage.setItem('hoy', fechaActual());
    const persona = buscarPersonas();
    document.getElementById('cantidadMeses').value = mesesVividos(persona);
    document.getElementById('cantidadSemanas').value = semanasVividas(persona);
    document.getElementById('cantidadDias').value = diasVividos(persona);
    document.getElementById('cantidadHoras').value = horasVividas(persona);
    document.getElementById('cantidadMinutos').value = minutosVividos(persona);
    document.getElementById('cantidadSegundos').value = segundosVividos(persona);
    document.getElementById('cantidadMsegundos').value = msegundosVividos(persona);

}

const guardar = (clave, valor) => { localStorage.setItem(clave, valor) }

let id = 0;
//const persona = new Persona();
function cargarDatos() {
    let nombre = document.getElementById('nombre').value;
    let dia = document.getElementById('dia').value;
    let mes = document.getElementById('mes').value;
    let anio = document.getElementById('anio').value;
    let hora = document.getElementById('hora').value;
    let sistemaHorario = document.getElementById('sistemaHorario').value;


    if (nombre == '' || dia == '' || mes == '' || anio == '' || hora == '') {

    }

    const persona = new Persona(id, nombre, dia, mes, anio, hora, sistemaHorario);
    const enJSON = JSON.stringify(persona);
    guardar(persona.id, enJSON);
    id++;
    //localStorage.setItem('hoy', fechaActual());
    borrar();
    escribir();

    /*persona.id = id;
        persona.nombre = document.getElementById('nombre').value;
        persona.dia = document.getElementById('dia').value;
        persona.mes = document.getElementById('mes').value;
        persona.anio = document.getElementById('anio').value;
        persona.hora = document.getElementById('hora').value;
        persona.sistemaHorario = document.getElementById('sistemaHorario').value;*/
    //const persona = new Persona(id, nombre, dia, mes, anio, hora, sistemaHorario);

    //localStorage.setItem(persona.id, JSON.stringify(persona));

}

//var myVar = setInterval(myTimer, 1000);

/*function myTimer() {
var d = new Date();
console.log( d.toLocaleTimeString());
}*/

//document.getElementById("hora").onmouseleave =function() {calcular()}; 
document.getElementById("calcular").onclick = function () { cargarDatos(), setInterval(tiempoVivido, 1) };
//document.getElementById("calcular").onclick = function () { cargarDatos() }
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