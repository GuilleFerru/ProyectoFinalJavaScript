window.onload = function () {
    localStorage.clear()
    console.log('localStorage cleaned')
}

let id = 0;
let intervalo = 0;

class Persona {
    constructor(id, nombre, dia, mes, anio, hora) {
        this.id = id;
        this.nombre = nombre;
        this.dia = dia;
        this.mes = mes;
        this.anio = anio;
        this.hora = hora;
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
    } else {
        const diasMesAnterior = new Date(fechaActual().getFullYear(), (fechaActual().getMonth()), 0).getDate(); //cant de dias del mes anterior
        console.log(diasMesAnterior)
        dias = fechaActual().getDate() + parseInt(diasMesAnterior - persona.dia);

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
    let personas = buscarPersonas();
    for (let persona of personas) {
        if (persona.id == (id - 1)) {

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
    }
}

function buscarPersonas() {
    const personas = [];
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        let item = localStorage.getItem(clave);
        let personaNueva = JSON.parse(item);
        //console.log(personaNueva.fechaNacimiento())
        const persona = new Persona(personaNueva.id, personaNueva.nombre, personaNueva.dia, personaNueva.mes, personaNueva.anio, personaNueva.hora, personaNueva.sistemaHorario);
        personas.push(persona)
    }
    return personas;
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

function checkVacio() {
    let nombre = document.getElementById('nombre').value;
    if (nombre !== "" || nombre !== null) {
        for (let i = 0; i < document.getElementsByClassName('entradas').length; i++) {
            document.getElementsByClassName('entradas')[i].value = '';
            document.getElementsByClassName('entradas')[i].classList.remove('is-valid')
            document.getElementsByClassName('entradas')[i].classList.remove('is-invalid')
        }
        clearInterval(intervalo);
        borrar();
    }
}


function escribir() {
    let personas = buscarPersonas();
    for (let persona of personas) {
        if (persona.id == (id - 1)) {
            let h3Edad = document.createElement('h3');
            h3Edad.setAttribute('id', 'mostrarNombreEdadH3');
            h3Edad.innerHTML = aniosVividos(persona);
            mostrarNombreEdad.appendChild(h3Edad);
            cumple();
            intervalo = setInterval(tiempoVivido, 1)
        }

    }
}

function tiempoVivido() {
    //localStorage.setItem('hoy', fechaActual());
    let personas = buscarPersonas();
    for (let persona of personas) {
        if (persona.id == (id - 1)) {
            document.getElementById('cantidadMeses').value = mesesVividos(persona);
            document.getElementById('cantidadSemanas').value = semanasVividas(persona);
            document.getElementById('cantidadDias').value = diasVividos(persona);
            document.getElementById('cantidadHoras').value = horasVividas(persona);
            document.getElementById('cantidadMinutos').value = minutosVividos(persona);
            document.getElementById('cantidadSegundos').value = segundosVividos(persona);
            document.getElementById('cantidadMsegundos').value = msegundosVividos(persona);
        }
    }
}

const guardar = (clave, valor) => { localStorage.setItem(clave, valor) }
let esValido = (div) => { div.classList.add('is-valid'), div.classList.remove('is-invalid') }
let esInvalido = (div) => { div.classList.add('is-invalid'), div.classList.remove('is-valid') }

function validar() {
    let nombre = document.getElementById('nombre');
    let dia = document.getElementById('dia');
    let mes = document.getElementById('mes');
    let anio = document.getElementById('anio');
    let hora = document.getElementById('hora');
    let sistemaHorario = document.getElementById('sistemaHorario');
    let flag = false;

    if (nombre.value == '' || nombre.value == null) {
        esInvalido(nombre);
        flag = false;
    } else {
        esValido(nombre);
        flag = true;
    }
    if (isNaN(dia.value) || dia.value == '' || (dia.value <= 0 || dia.value > 31)) {
        esInvalido(dia);
        flag = false;
    } else {
        esValido(dia);
        flag = true;

    }
    if (isNaN(mes.value) || mes.value == '' || (mes.value <= 0 || mes.value > 12)) {
        esInvalido(mes);
        flag = false;
    } else {
        esValido(mes);
        flag = true;
    }
    if (isNaN(anio.value) || anio.value == '') {
        esInvalido(anio);
        flag = false;
    } else {
        esValido(anio);
        flag = true;
    }
    if (isNaN(hora.value) || hora.value == '' || (hora.value < 0 || hora.value > 23)) {
        esInvalido(hora);
        flag = false;
    } else {
        esValido(hora);
        flag = true;
    }
    if (flag == true) {
        const persona = new Persona(id, nombre.value, dia.value, mes.value, anio.value, hora.value);
        const enJSON = JSON.stringify(persona);
        guardar(persona.id, enJSON);
        id++;
        borrar();
        escribir();
    }

}


document.getElementById("calcular").onclick = function () { validar() };





/* Alumno: Guillermo Ferrucci */