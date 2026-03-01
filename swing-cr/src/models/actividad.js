import { Evento } from './evento.js';

export class Actividad extends Evento {
  constructor(dia, hora, sala, tipoEvento, tipoActividad, banda, descripcion) {
    super(dia, hora, sala, tipoEvento);
    
    this.tipoActividad = tipoActividad;
    this.banda = banda; 
    this.descripcion = descripcion;
  }
}