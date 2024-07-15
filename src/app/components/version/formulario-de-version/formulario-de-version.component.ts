import { Component } from '@angular/core';
import { AhorroDto } from '../../../interfaces/ahorro-dto';
import { ServicioService } from '../../../services/servicio.service';
import { DetalleDto } from '../../../interfaces/version-dto';

@Component({
  selector: 'app-formulario-de-version',
  standalone: true,
  imports: [],
  templateUrl: './formulario-de-version.component.html',
  styleUrl: './formulario-de-version.component.css'
})
export class FormularioDeVersionComponent {
  ahorros: AhorroDto[] =[]
  detalles: DetalleDto[]=[]

  constructor(private servicio: ServicioService){
    this.obtenerAhorros()
    this.detalles.push({ ahorroId:'', cantidad:0, nombre:''})
  }

  obtenerAhorros() {
    this.servicio.ahorro.obtener().subscribe({
      next:(data)=>{
        this.ahorros = data
      }
    })
  }

  agregarElemento(){
    this.detalles.push({ ahorroId:'', cantidad:0, nombre:''})
  }
}
