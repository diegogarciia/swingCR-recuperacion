export function initHorario() {
  generarHorario();
  cargarEventos();
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

      celda.appendChild(tarjeta);
    }
  }
}