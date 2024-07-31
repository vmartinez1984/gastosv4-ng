import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleDelPeriodoDto, MovimientoPeriodoDtoIn, PeriodoDto } from '../../../interfaces/periodo-dto';
import { CurrencyPipe } from '@angular/common';
import { FormularioDeMovimientoDePeriodoComponent } from "../formulario-de-movimiento/formulario-de-movimiento-de-periodo.component";
import { AhorroDto } from '../../../interfaces/ahorro-dto';

@Component({
  selector: 'app-detalle-de-periodo',
  standalone: true,
  imports: [CurrencyPipe, FormularioDeMovimientoDePeriodoComponent],
  templateUrl: './detalle-de-periodo.component.html',
  styleUrl: './detalle-de-periodo.component.css'
})
export class DetalleDePeriodoComponent {
  estaCargando = false
  nombre = ''
  cantidad = 0
  detalleId: string = ''
  id!: string
  periodo!: PeriodoDto
  ahorro!: AhorroDto
  detalles: DetalleDelPeriodoDto[] = []
  titulo = ''
  @ViewChild('botonDeCerrar') botonDeCerrar!: ElementRef
  limpiarFormulario = false
  total = 0

  agregarMovimiento(movimiento: MovimientoPeriodoDtoIn) {
    movimiento.detalleId = this.detalleId
    this.estaCargando = true
    this.servicio.periodo.agregarMovimiento(this.id, movimiento).subscribe({
      next: (data) => {
        //console.log(data)
        var index = this.periodo.detalles.findIndex(x => x.detalle.guid == this.detalleId)
        this.periodo.detalles[index].movimientos.push({
          cantidad: movimiento.cantidad,
          guid: data.guid,
          nota: movimiento.nota
        })
        this.ahorro.total = this.ahorro.total - movimiento.cantidad
        this.estaCargando = false
        this.botonDeCerrar.nativeElement.click()
        this.limpiarFormulario = true
      }, error: (data) => {
        console.log(data)
        this.estaCargando = false
        this.botonDeCerrar.nativeElement.click()
      }
    })
  }

  enviarData(detalle: DetalleDelPeriodoDto) {
    this.nombre = detalle.detalle.nombre
    this.cantidad = detalle.detalle.cantidad
  }

  mostrarFormulario(detalle: DetalleDelPeriodoDto) {
    this.titulo = detalle.detalle.nombre
    this.cantidad = detalle.detalle.cantidad
    this.detalleId = detalle.detalle.guid
  }

  ocultarFormulario() { }

  constructor(private servicio: ServicioService, private activatedRouter: ActivatedRoute, private route: Router) {
    this.activatedRouter.params.subscribe(
      (data) => {
        //console.log(data)
        this.obtenerPeriodo(data['id'])
        this.obtenerAhorro()
        this.id = data['id']
      }
    )
  }

  obtenerPeriodo(id: any) {
    this.estaCargando = true
    this.servicio.periodo.obtenerPorId(id).subscribe({
      next: (data) => {
        //console.log(data)
        this.periodo = data
        this.detalles = data.detalles
        //console.log(this.detalles)
        this.estaCargando = false
        this.ObtenerAhorros(this.periodo)
        this.total = 0
        this.periodo.detalles.forEach(item => {
          item.movimientos.forEach(movimiento => {
            this.total = this.total + movimiento.cantidad
          })
        })
      }
    })
  }

  ObtenerAhorros(periodo: PeriodoDto) {
    periodo.detalles.forEach(detalle => {
      this.servicio.ahorro.obtenerPorId(detalle.detalle.ahorroId).subscribe({
        next: (data) => {
          detalle.detalle.ahorroTipoDeCuenta = data.otros.tipoDeCuenta
          detalle.detalle.ahorroTotal = data.total
        }
      })
    })
  }

  obtenerAhorro() {
    this.estaCargando = true
    this.servicio.ahorro.obtenerPorId("1007").subscribe({
      next: (data) => {
        //console.log(data)
        this.ahorro = data
        this.estaCargando = false
      }
    })
  }
}
