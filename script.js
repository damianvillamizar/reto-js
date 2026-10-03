// Estructuras de datos
const MAX_ALUMNOS = 10;
const nombres = []; 
const notas = [];  

document.addEventListener('DOMContentLoaded', () => {
    const alumnoForm = document.getElementById('alumnoForm');
    alumnoForm.addEventListener('submit', agregarAlumno);
});

function agregarAlumno(event) {
    event.preventDefault();

    if (nombres.length >= MAX_ALUMNOS) {
        alert("Ya se han ingresado los 10 alumnos del curso.");
        return;
    }

    const nombreInput = document.getElementById('nombre');
    const c1Input = document.getElementById('c1');
    const c2Input = document.getElementById('c2');
    const c3Input = document.getElementById('c3');
    const errorMsg = document.getElementById('mensajeError');

    const nombre = nombreInput.value.trim();
    const c1 = parseFloat(c1Input.value);
    const c2 = parseFloat(c2Input.value);
    const c3 = parseFloat(c3Input.value);

    if (isNaN(c1) || isNaN(c2) || isNaN(c3) || 
        c1 < 0 || c1 > 100 || c2 < 0 || c2 > 100 || c3 < 0 || c3 > 100) {
        errorMsg.style.display = 'block';
        return;
    }
    errorMsg.style.display = 'none';

    nombres.push(nombre);
    notas.push([c1, c2, c3]);

    nombreInput.value = '';
    c1Input.value = '';
    c2Input.value = '';
    c3Input.value = '';
    nombreInput.focus();

    if (nombres.length === MAX_ALUMNOS) {
        const btnAgregar = document.getElementById('btnAgregar');
        btnAgregar.disabled = true;
        btnAgregar.innerText = "Curso Completo (10/10)";
    }

    actualizarResultados();
}


const calcularPromedioArreglo = (arr) => {
    if (arr.length === 0) return 0;
    const suma = arr.reduce((acc, val) => acc + val, 0);
    return suma / arr.length;
};

function actualizarResultados() {
    const cardResultados = document.getElementById('cardResultados');
    const contenedorResultados = document.getElementById('resultados');

    cardResultados.style.display = 'block';

    let html = '';
    const promediosAlumnos = [];

    nombres.forEach((nombre, index) => {
        const notasAlumno = notas[index];
        const promedioAlumno = calcularPromedioArreglo(notasAlumno);
        promediosAlumnos.push({ nombre, promedio: promedioAlumno });

        html += `<div class="alumno-block">`;
        html += `<div>Nombre ${index + 1}: ${nombre}</div>`;
        html += `<div>C1: ${notasAlumno[0]}</div>`;
        html += `<div>C2: ${notasAlumno[1]}</div>`;
        html += `<div>C3: ${notasAlumno[2]}</div>`;
        html += `<div>Promedio: ${promedioAlumno.toFixed(2)}</div>`;
        html += `</div>`;
    });

    const notasC1 = notas.map(n => n[0]);
    const notasC2 = notas.map(n => n[1]);
    const notasC3 = notas.map(n => n[2]);

    const promC1 = calcularPromedioArreglo(notasC1);
    const promC2 = calcularPromedioArreglo(notasC2);
    const promC3 = calcularPromedioArreglo(notasC3);

    const promGeneral = calcularPromedioArreglo([promC1, promC2, promC3]);

    const aprobados = promediosAlumnos.filter(a => a.promedio >= 55).length;
    const reprobados = promediosAlumnos.filter(a => a.promedio < 55).length;

    html += `<div class="resumen-block">`;
    html += `<div>Promedio del curso C1: ${promC1.toFixed(2)}</div>`;
    html += `<div>Promedio del curso C2: ${promC2.toFixed(2)}</div>`;
    html += `<div>Promedio del curso C3: ${promC3.toFixed(2)}</div>`;
    html += `<div>Promedio Final Curso: ${promGeneral.toFixed(2)}</div>`;
    html += `<div>Aprobados: ${aprobados}</div>`;
    html += `<div>Reprobados: ${reprobados}</div>`;
    html += `</div>`;

    const alumnosOrdenados = [...promediosAlumnos].sort((a, b) => b.promedio - a.promedio);

    html += `<div class="ordenados-block">`;
    html += `<strong>Alumnos ordenados por promedio:</strong><br>`;
    alumnosOrdenados.forEach((item, idx) => {
        html += `<div>${idx + 1}. ${item.nombre}: ${item.promedio.toFixed(2)}</div>`;
    });
    html += `</div>`;

    contenedorResultados.innerHTML = html;
}