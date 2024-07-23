import { Component } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleDelPeriodoDto, MovimientoPeriodoDtoIn, PeriodoDto } from '../../../interfaces/periodo-dto';
import { CurrencyPipe } from '@angular/common';
import { FormularioDeMovimientoDePeriodoComponent } from "../formulario-de-movimiento/formulario-de-movimiento-de-periodo.component";

@Component({
  selector: 'app-detalle-de-periodo',
  standalone: true,
  imports: [CurrencyPipe, FormularioDeMovimientoDePeriodoComponent],
  templateUrl: './detalle-de-periodo.component.html',
  styleUrl: './detalle-de-periodo.component.css'
})
export class DetalleDePeriodoComponent {
  agregarMovimiento(movimiento: MovimientoPeriodoDtoIn) {
    movimiento.detalleId = this.detalleId
    this.servicio.periodo.agregarMovimiento(this.id, movimiento).subscribe({
      next: (data) => {
        console.log(data)
      }, error: (data) => {
        console.log(data)
      }
    })
  }

  nombre = ''
  cantidad = 0
  detalleId: string = ''

  enviarData(detalle: DetalleDelPeriodoDto) {
    this.nombre = detalle.detalle.nombre
    this.cantidad = detalle.detalle.cantidad
    this.detalleId = detalle.detalle.guid
  }
  ocultarFormulario() {
    this.mostrarFormulario = false
  }
  mostrarFormulario = false
  verFormulario(mostrarFormulario: boolean) {
    if (mostrarFormulario) {
      this.mostrarFormulario = true
    } else {
      this.mostrarFormulario = false
    }
  }
  id!: string
  periodo!: PeriodoDto
  detalles: DetalleDelPeriodoDto[] = []

  constructor(private servicio: ServicioService, private activatedRouter: ActivatedRoute, private route: Router) {
    this.activatedRouter.params.subscribe(
      (data) => {
        //console.log(data)
        this.obtenerPeriodo(data['id'])
        this.id = data['id']
      }
    )
  }

  obtenerPeriodo(id: any) {
    this.servicio.periodo.obtenerPorId(id).subscribe({
      next: (data) => {
        //console.log(data)
        this.periodo = data
        this.detalles = data.detalles
        //console.log(this.detalles)
      }
    })
  }
}
