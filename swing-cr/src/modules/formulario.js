import { Clase } from '../models/clase.js';
import { Actividad } from '../models/actividad.js';
import { initHorario } from './horario.js';

export function initFormulario() {
  const diaSelect = document.getElementById("dia");
  const horaSelect = document.getElementById("hora");
  const tipoSelect = document.getElementById("tipo");
  const salaSelect = document.getElementById("sala");
  const camposClase = document.getElementById("campos-clase");
  const camposActividad = document.getElementById("campos-actividad");
  
  const formularioEvento = document.getElementById("formulario-evento");

  tipoSelect.addEventListener("change", () => {
    camposClase.style.display = "none";
    camposActividad.style.display = "none";

    if (tipoSelect.value === "clase") {
      camposClase.style.display = "flex";
    } else if (tipoSelect.value === "actividad") {
      camposActividad.style.display = "flex";
    }
    
    validarSalas();
  });

  diaSelect.addEventListener("change", () => {
    horaSelect.innerHTML = '<option value="">-- Selecciona --</option>';
    salaSelect.innerHTML = '<option value="">-- Elige día, hora y tipo primero --</option>';
    salaSelect.disabled = true;

    if (diaSelect.value !== "") {
      horaSelect.disabled = false;
      let horaInicio = 0;
      let horaFin = 23;

      if (diaSelect.value === "viernes") horaInicio = 20;
      if (diaSelect.value === "domingo") horaFin = 19;

      for (let i = horaInicio; i <= horaFin; i++) {
        let option = document.createElement("option");
        let horaTexto = i < 10 ? "0" + i + ":00" : i + ":00";
        option.value = horaTexto;
        option.textContent = horaTexto;
        horaSelect.appendChild(option);
      }
    } else {
      horaSelect.disabled = true;
    }
    
    validarSalas();
  });

  horaSelect.addEventListener("change", validarSalas);

  function validarSalas() {
    const dia = diaSelect.value;
    const hora = horaSelect.value;
    const tipo = tipoSelect.value;

    if (dia === "" || hora === "" || tipo === "") {
      salaSelect.innerHTML = '<option value="">-- Elige día, hora y tipo primero --</option>';
      salaSelect.disabled = true;
      return;
    }

    salaSelect.disabled = false;
    salaSelect.innerHTML = '<option value="">-- Selecciona una sala libre --</option>';

    let salasPermitidas = ["Sala Be Hopper", "Sala New Orleans", "Sala Savoy"];
    if (tipo === "actividad") {
      salasPermitidas.push("Antiguo Casino", "Parque de Gasset", "Prado");
    }

    let eventosGuardados = JSON.parse(localStorage.getItem("eventos"));
    if (eventosGuardados === null) {
      eventosGuardados = [];
    }

    for (let i = 0; i < salasPermitidas.length; i++) {
      let nombreSala = salasPermitidas[i];
      let estaOcupada = false;

      for (let j = 0; j < eventosGuardados.length; j++) {
        let evento = eventosGuardados[j];
        if (evento.dia === dia && evento.hora === hora && evento.sala === nombreSala) {
          estaOcupada = true;
        }
      }

      let option = document.createElement("option");
      option.value = nombreSala;
      
      if (estaOcupada === true) {
        option.textContent = nombreSala + " (Ocupada)";
        option.disabled = true;
      } else {
        option.textContent = nombreSala;
      }
      
      salaSelect.appendChild(option);
    }
  }

  formularioEvento.addEventListener("submit", (e) => {
    e.preventDefault();

    const dia = diaSelect.value;
    const hora = horaSelect.value;
    const sala = salaSelect.value;
    const tipo = tipoSelect.value;

    let nuevoEvento;

    if (tipo === "clase") {
      const estilo = document.getElementById("estilo-clase").value;
      const nivel = document.getElementById("nivel-clase").value;
      const profesores = document.getElementById("profesores-clase").value;
      nuevoEvento = new Clase(dia, hora, sala, tipo, estilo, nivel, profesores);
    } else {
      const tipoAct = document.getElementById("tipo-actividad").value;
      const banda = document.querySelector('input[name="banda"]:checked').value;
      const desc = document.getElementById("descripcion-actividad").value;
      nuevoEvento = new Actividad(dia, hora, sala, tipo, tipoAct, banda, desc);
    }

    let eventosGuardados = JSON.parse(localStorage.getItem("eventos"));
    if (eventosGuardados === null) {
      eventosGuardados = [];
    }
    
    eventosGuardados.push(nuevoEvento);
    localStorage.setItem("eventos", JSON.stringify(eventosGuardados));

    alert("¡Evento registrado con éxito!");

    formularioEvento.reset();
    camposClase.style.display = "none";
    camposActividad.style.display = "none";
    horaSelect.disabled = true;
    salaSelect.disabled = true;
    initHorario();
  });
}