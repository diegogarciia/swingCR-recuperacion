export function initHorario() {
  generarHorario();
  cargarEventos();
  configurarCierreModal();
}

function generarHorario() {
  const configuracionDias = [
    { idTbody: "tbody-viernes", nombre: "viernes", inicio: 20, fin: 23 },
    { idTbody: "tbody-sabado", nombre: "sabado", inicio: 0, fin: 23 },
    { idTbody: "tbody-domingo", nombre: "domingo", inicio: 0, fin: 19 }
  ];

  const salas = [
    "Sala Be Hopper", "Sala New Orleans", "Sala Savoy",
    "Antiguo Casino", "Parque de Gasset", "Prado"
  ];

  for (let d = 0; d < configuracionDias.length; d++) {
    let diaActual = configuracionDias[d];
    let tbody = document.getElementById(diaActual.idTbody);
    tbody.innerHTML = ""; 

    for (let h = diaActual.inicio; h <= diaActual.fin; h++) {
      let tr = document.createElement("tr");

      let tdHora = document.createElement("td");
      let horaTexto = h < 10 ? "0" + h + ":00" : h + ":00";
      tdHora.textContent = horaTexto;
      tdHora.style.fontWeight = "bold";
      tr.appendChild(tdHora);

      for (let s = 0; s < salas.length; s++) {
        let tdSala = document.createElement("td");
        
        tdSala.id = diaActual.nombre + "-" + horaTexto + "-" + salas[s];
        
        tr.appendChild(tdSala);
      }

      tbody.appendChild(tr);
    }
  }
}

function cargarEventos() {
  let eventosGuardados = JSON.parse(localStorage.getItem("eventos"));

  if (eventosGuardados === null) {
    return; 
  }

  for (let i = 0; i < eventosGuardados.length; i++) {
    let evento = eventosGuardados[i];

    let idCeldaDestino = evento.dia + "-" + evento.hora + "-" + evento.sala;
    let celda = document.getElementById(idCeldaDestino);

    if (celda !== null) {
      let tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-evento");

      if (evento.tipoEvento === "clase") {
        tarjeta.classList.add("tarjeta-clase");
        tarjeta.innerHTML = "<strong>Clase: " + evento.estilo + "</strong><br>" + evento.profesores;
      } else {
        tarjeta.classList.add("tarjeta-actividad");
        tarjeta.innerHTML = "<strong>Actividad: " + evento.tipoActividad + "</strong><br>" + (evento.banda === "si" ? "Banda en directo" : "Sin banda");
      }

      tarjeta.addEventListener("click", function() {
        abrirModal(evento);
      });

      celda.appendChild(tarjeta);
    }
  }
}

function abrirModal(evento) {
  let modal = document.getElementById("modal-evento");
  let titulo = document.getElementById("modal-titulo");
  let info = document.getElementById("modal-info");
  let btnEliminar = document.getElementById("btn-eliminar");

  if (evento.tipoEvento === "clase") {
    titulo.textContent = "Detalles de la Clase";
    info.innerHTML = 
      "<p><b>Día:</b> " + evento.dia + "</p>" +
      "<p><b>Hora:</b> " + evento.hora + "</p>" +
      "<p><b>Sala:</b> " + evento.sala + "</p>" +
      "<p><b>Estilo:</b> " + evento.estilo + "</p>" +
      "<p><b>Nivel:</b> " + evento.nivel + "</p>" +
      "<p><b>Profesores:</b> " + evento.profesores + "</p>";
  } else {
    titulo.textContent = "Detalles de la Actividad";
    info.innerHTML = 
      "<p><b>Día:</b> " + evento.dia + "</p>" +
      "<p><b>Hora:</b> " + evento.hora + "</p>" +
      "<p><b>Lugar:</b> " + evento.sala + "</p>" +
      "<p><b>Tipo:</b> " + evento.tipoActividad + "</p>" +
      "<p><b>Banda en directo:</b> " + evento.banda + "</p>" +
      "<p><b>Descripción:</b> " + evento.descripcion + "</p>";
  }

  modal.style.display = "flex";

  btnEliminar.onclick = function() {
    borrarEvento(evento.id);
  };
}

function configurarCierreModal() {
  let btnCerrar = document.getElementById("cerrar-modal");
  let modal = document.getElementById("modal-evento");

  btnCerrar.addEventListener("click", function() {
    modal.style.display = "none";
  });
}

function borrarEvento(idEventoBorrar) {
  let eventosGuardados = JSON.parse(localStorage.getItem("eventos"));
  let listaSinEventoEliminar = [];

  for (let i = 0; i < eventosGuardados.length; i++) {
    if (eventosGuardados[i].id !== idEventoBorrar) {
      listaSinEventoEliminar.push(eventosGuardados[i]);
    }
  }

  localStorage.setItem("eventos", JSON.stringify(listaSinEventoEliminar));

  window.location.reload();
}