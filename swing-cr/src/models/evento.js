export class Evento {
  constructor(dia, hora, sala, tipoEvento) {
    this.id = Date.now().toString(); 
    this.dia = dia;
    this.hora = hora;
    this.sala = sala;
    this.tipoEvento = tipoEvento; 
  }
}