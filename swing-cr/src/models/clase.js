import { Evento } from './evento.js';

export class Clase extends Evento {
  constructor(dia, hora, sala, tipoEvento, estilo, nivel, profesores) {
    super(dia, hora, sala, tipoEvento);
    
    this.estilo = estilo;
    this.nivel = nivel;
    this.profesores = profesores;
  }
}