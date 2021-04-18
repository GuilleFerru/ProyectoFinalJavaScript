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
        console.log(nacimiento)
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
    while (new Date(sessionStorage.getItem('hoy')) <= new Date()){
        return (milisegundos(new Date(sessionStorage.getItem('hoy')), persona.fechaNacimiento()) / (1000));
    }

}

function cumple(dia, mes) {
    let hoy = fechaActual();
    anio = hoy.getFullYear();

    let fechaCumple = new Date(anio, mes - 1, dia);
    let dias = (milisegundos(fechaCumple, hoy) / (3600000 * 24));

    if (dias < 0) {
        fechaCumple = new Date(anio + 1, mes - 1, dia);
        dias = (milisegundos(fechaCumple, hoy) / (3600000 * 24));
    }
    switch (dias) {
        case 0: {
            alert("Y hoy es su cumple!! Feliz cumpleaños");
            break;
        }
        case 1: {
            alert("Y falta " + dias + " dia para su cumpleaños!");
            break;
        }
        default: {
            alert("Y faltan " + dias + " dias para su cumpleaños!!");
            break;
        }
    }
}

function borrar() {
    let mostrarNombreEdad = document.getElementById('mostrarNombreEdad');
    if (mostrarNombreEdad.hasChildNodes()) {
        let borrar = document.getElementById('mostrarNombreEdadH3');
        borrar.parentNode.removeChild(borrar);
        for (let i = 0; i < document.getElementsByClassName('resultados').length; i++) {
            document.getElementsByClassName('resultados')[i].value = ''
        }
    }
}


function escribir(persona) {
    let container = document.createElement('h3');
    console.log(JSON.parse(sessionStorage.getItem(persona.id)).nombre)
    container.setAttribute('id', 'mostrarNombreEdadH3');
    container.innerHTML = `${persona.nombre} actualmente tienes ${aniosVividos(persona)} años y naciste un ${diaSemana(persona)}`;
    mostrarNombreEdad.appendChild(container);
    document.getElementById('cantidadMeses').value = mesesVividos(persona);
    document.getElementById('cantidadSemanas').value = semanasVividas(persona);
    document.getElementById('cantidadDias').value = diasVividos(persona);
    document.getElementById('cantidadHoras').value = horasVividas(persona);
    document.getElementById('cantidadMinutos').value = minutosVividos(persona);
    document.getElementById('cantidadSegundos').value = segundosVividos(persona);
    document.getElementById('cantidadMsegundos').value = msegundosVividos(persona);


}

let id = 0;
function calcular() {
    let nombre = document.getElementById('nombre').value;
    let dia = document.getElementById('dia').value;
    let mes = document.getElementById('mes').value;
    let anio = document.getElementById('anio').value;
    let hora = document.getElementById('hora').value;
    let sistemaHorario = document.getElementById('sistemaHorario').value;
    const persona = new Persona(id, nombre, dia, mes, anio, hora, sistemaHorario);
    id++;
    sessionStorage.setItem('hoy', fechaActual());
    sessionStorage.setItem(persona.id, JSON.stringify(persona));
    borrar();
    escribir(persona);
}


/*for (const persona of personas) {
    if (persona.anio < 1970) {
        alert("No se puede calcular lo solicitado sobre la persona " + persona.id);
    } else {
        diasVividos(persona);
        cumple(persona.dia, persona.mes);
    }

}*/

/* Alumno: Guillermo Ferrucci */