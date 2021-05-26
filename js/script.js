window.onload = function () {
    localStorage.clear()
}

//llamada a la API
$(function () {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=Cordoba&units=metric&appid=dc4c2c5bd09cf02520edfb88e52c5d8d',
        type: 'GET',
        dataType: 'jsonp',
        success: function (data) {
            $('#climaIcono').html(`<img src="icons/${data.weather[0].icon}.png"></img>`);
            $('#clima').html(`Temperatura actual en la ciudad de ${data.name} es de ${data.main.temp}°C.`
            );
        }
    });
});


//post 
function guardarJson(persona){
    const url = 'https://jsonplaceholder.typicode.com/posts';
    $.post(url, JSON.stringify(persona), function(respuesta, estado){
        if(estado === 'success'){
            console.log('Se guardo persona en API')
        }
    })

}

let id = 0;
let intervalo = 0;
let indiceTabla = 1;

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
    if (fechaActual().getDate() >= persona.dia) {
        dias = fechaActual().getDate() - persona.dia;
    } else {
        const diasMesAnterior = new Date(fechaActual().getFullYear(), (fechaActual().getMonth()), 0).getDate(); //cant de dias del mes anterior
        dias = fechaActual().getDate() + parseInt(diasMesAnterior - persona.dia);

    }
    $('#mostrarNombreEdadH3').html(`${persona.nombre} actualmente tienes ${Math.floor(anios)} años, ${meses} meses y ${dias} dias. Por cierto naciste un ${diaSemana(persona)}`);

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
                    $('#mostrarCumpleH3').html('Hoy es tu cumpleaños! <strong>FELIZ CUMPLE!!!</strong>');
                    break;
                }
                case 1: {
                    $('#mostrarCumpleH3').html(`Falta ${diasParaCumple} día para tu cumpleaños!!`);
                    break;
                }
                default: {
                    $('#mostrarCumpleH3').html(`Faltan ${diasParaCumple} días para tu cumpleaños!!`);
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
        const persona = new Persona(personaNueva.id, personaNueva.nombre, personaNueva.dia, personaNueva.mes, personaNueva.anio, personaNueva.hora, personaNueva.sistemaHorario);
        personas.push(persona)
    }
    return personas;
}

function borrar() {
    if ($('#mostrarNombreEdadH3').html().length > 0 && $('#mostrarCumpleH3').html().length > 0) {
        $('#mostrarNombreEdadH3').slideToggle('slow');
        $('#mostrarCumpleH3').slideToggle('slow');
        for (let i = 0; i < document.getElementsByClassName('resultados').length; i++) {
            document.getElementsByClassName('resultados')[i].value = ''
        }
    }
}

function checkVacio() {
    let nombre = document.getElementById('nombre').value;
    if (nombre !== "" && nombre !== null) {
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
            aniosVividos(persona);
            $('#mostrarNombreEdadH3').slideToggle('slow');
            cumple();
            $('#mostrarCumpleH3').slideToggle('slow');
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

function buscarPersona(id) {
    let item = localStorage.getItem(id);
    let personaNueva = JSON.parse(item);
    const persona = new Persona(personaNueva.id, personaNueva.nombre, personaNueva.dia, personaNueva.mes, personaNueva.anio, personaNueva.hora, personaNueva.sistemaHorario);
    return persona
}

$('#cerrarModal').on('click', function () {
    $('.checkTabla').each(function () {
        $(this).prop('checked', false);
        btnBorrar(this.value, false);
    })
    personasComparar = [];
})

function ejecutarModal() {
    let myModal = new bootstrap.Modal(document.getElementById('modalComparar'));
    let personaMayor = {};
    let personaMenor = {};

    //persona mayor
    if (personasComparar[0].fechaNacimiento() < personasComparar[1].fechaNacimiento()) {
        personaMayor = personasComparar[0];
        personaMenor = personasComparar[1];
    } else {
        personaMayor = personasComparar[1];
        personaMenor = personasComparar[0];
    }

    const anios = milisegundos(personaMenor.fechaNacimiento(), personaMayor.fechaNacimiento()) / (31540000000);
    const meses = Math.floor((anios - Math.floor(anios)) * 12);

    let dias = 0;
    if (personaMenor.fechaNacimiento().getDate() >= personaMayor.dia) {
        dias = personaMenor.fechaNacimiento().getDate() - personaMayor.dia;
    } else {
        const diasMesAnterior = new Date(personaMenor.fechaNacimiento().getFullYear(), (personaMenor.fechaNacimiento().getMonth()), 0).getDate(); //cant de dias del mes anterior
        dias = personaMenor.fechaNacimiento().getDate() + parseInt(diasMesAnterior - personaMayor.dia);
    }
    function stringDia() {
        if (dias == 1) {
            return 'dia'
        } else {
            return 'dias'
        }
    }

    function stringMes() {
        if (meses == 1) {
            return 'mes'
        } else {
            return 'meses'
        }
    }

    let diaSemanaMayor = diaSemana(personaMayor);
    let diaSemanaMenor = diaSemana(personaMenor);
    let textoDiaSemana = "";

    if (diaSemanaMayor === diaSemanaMenor) {
        textoDiaSemana = "Ademas ambos nacieron un " + diaSemanaMenor;
    } else {
        textoDiaSemana = `Ademas&nbsp<strong>${personaMayor.nombre}</strong>&nbspnació un ${diaSemana(personaMayor)} y&nbsp<strong>${personaMenor.nombre}</strong>&nbspnació un ${diaSemana(personaMenor)}`
    }

    let textoInicial = `Sabias que&nbsp<strong>${personaMayor.nombre}</strong>&nbspes mayor que&nbsp<strong>${personaMenor.nombre}</strong>&nbsppor ${Math.floor(anios)} años, ${meses} ${stringMes()} y ${dias} ${stringDia()}.
                        ${textoDiaSemana}.`
    $('#modalBody').html(`
                        <p class ="text-justify">${textoInicial}</p>
                        <div class="container">
                            <div class="table-responsive">
                                <table class="table custom-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Tiempo vivido</th>
                                            <th scope="col">${personaMayor.nombre}</th>
                                            <th scope="col">${personaMenor.nombre}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                <label class="control">En meses</label>
                                            </th>
                                            <td>${mesesVividos(personaMayor)}</td>
                                            <td>${mesesVividos(personaMenor)}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <label class="control">En semanas</label>
                                            </th>
                                            <td>${semanasVividas(personaMayor)}</td>
                                            <td>${semanasVividas(personaMenor)}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <label class="control">En días</label>
                                            </th>
                                            <td>${diasVividos(personaMayor)}</td>
                                            <td>${diasVividos(personaMenor)}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <label class="control">En horas</label>
                                            </th>
                                            <td>${horasVividas(personaMayor)}</td>
                                            <td>${horasVividas(personaMenor)}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <label class="control">En segundos</label>
                                            </th>
                                            <td>${segundosVividos(personaMayor)}</td>
                                            <td>${segundosVividos(personaMenor)}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">
                                            <label class="control">En ms</label>
                                            <td>${msegundosVividos(personaMayor)}</td>
                                            <td>${msegundosVividos(personaMenor)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>                   
                        `)
    let random = Math.floor(Math.random() * (10 - 1)) + 1;
    $("#avatar").attr("src", `icons/ico_lg_${random}.png`);

    myModal.toggle();

}
const btnBorrar = (fila, valor) => { $(`#btnBorraFila${fila}`).attr('disabled', valor) }

let personasComparar = [];
$('#bodyTabla').on('click', '.checkTabla', function (e) {
    if (this.checked && personasComparar.length < 2) {
        personasComparar.push(buscarPersona(this.value))
        btnBorrar(this.value, true);
    }
    if (personasComparar.length == 2) {
        $('#nombre').on('focus', checkVacio())
        ejecutarModal();
    } else if (this.checked == false) {
        btnBorrar(this.value, false);
        personasComparar.pop();

    }
})

function borrarFila(x) {
    let tr = x.parentNode.parentNode;
    document.getElementById('tablaPersonas').deleteRow(tr.rowIndex);
    localStorage.removeItem(tr.id);
    if ($('#tablaPersonas tr').length == 1) {
        $('#containerTabla').hide('slow');
    }
}

function llenarTabla(persona) {

    if ($('#tablaPersonas tr').length == 1) {
        $('#containerTabla').show('slow');
    }
    let tabla = document.getElementById('bodyTabla');
    let tr = document.createElement('tr')
    tr.setAttribute('id', `${persona.id}`)
    tr.classList.add('filasTabla')
    tr.innerHTML = `
                    <th scope="row">${indiceTabla}</th>
                        <td>${persona.nombre}</td>
                        <td>${Math.floor(milisegundos(fechaActual(), persona.fechaNacimiento()) / (31540000000))}</td>
                        <td>${(persona.fechaNacimiento()).toLocaleDateString()}</td>
                        <td>
                            <div class="form-check">
                                <input class="form-check-input checkTabla" type="checkbox" value="${persona.id}" id = "cb${persona.id}"> 
                            </div>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger btn-sm px-3" onclick="borrarFila(this)" id="btnBorraFila${persona.id}">
                                <i class="fa fa-times"></i>
                            </button>
                        </td>
                    `;
    tabla.appendChild(tr)
    tr.classList.add('efectoAparecer')
    indiceTabla++;
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
    let count = 0;

    if (nombre.value == '' || nombre.value == null) {
        esInvalido(nombre);
        count -= 1;
    } else {
        esValido(nombre);
        count += 1;
    }

    if (isNaN(dia.value) || dia.value == '' || (dia.value <= 0 || dia.value > 31)) {
        esInvalido(dia);
        count -= 1;
    } else {
        esValido(dia);
        count += 1;
    }

    if (isNaN(mes.value) || mes.value == '' || (mes.value <= 0 || mes.value > 12)) {
        esInvalido(mes);
        count -= 1;
    } else {
        esValido(mes);
        count += 1;
    }

    if ((isNaN(anio.value) || anio.value == '') || (parseInt(anio.value) >= parseInt(fechaActual().getFullYear()))) {
        esInvalido(anio);
        count -= 1;
    } else {
        esValido(anio);
        count += 1;
    }

    if (isNaN(hora.value) || hora.value == '' || (hora.value < 0 || hora.value > 23)) {
        esInvalido(hora);
        count -= 1;
    } else {
        esValido(hora);
        count += 1;
    }

    if (count == 5) {
        const persona = new Persona(id, nombre.value.charAt(0).toUpperCase() + nombre.value.slice(1), dia.value, mes.value, anio.value, hora.value);
        const enJSON = JSON.stringify(persona);
        guardar(persona.id, enJSON);
        id++;
        guardarJson(persona);
        //borrar();
        escribir();
        llenarTabla(persona);
    } else {
        //borrar();
    }
}

document.getElementById("calcular").onclick = function () { validar() };

/* Alumno: Guillermo Ferrucci */