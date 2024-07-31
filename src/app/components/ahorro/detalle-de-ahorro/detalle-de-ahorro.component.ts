import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { ActivatedRoute } from '@angular/router';
import { AhorroDto, MovimientoDtoIn } from '../../../interfaces/ahorro-dto';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { FormularioDeMovimientoComponent } from "../formulario-de-movimiento/formulario-de-movimiento.component";

@Component({
  selector: 'app-detalle-de-ahorro',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, FormularioDeMovimientoComponent],
  templateUrl: './detalle-de-ahorro.component.html',
  styleUrl: './detalle-de-ahorro.component.css'
})
export class DetalleDeAhorroComponent {
  titulo = ''
  colocarTitulo(arg0: string) {
    this.titulo = arg0
  }
  ahorroId: string = ''
  ahorro!: AhorroDto

  constructor(
    private servicio: ServicioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe({
      next: (data) => {
        this.ahorroId = data['id']
      }
    })
    this.obtenerAhorro(this.ahorroId)
  }

  obtenerAhorro(ahorroId: string) {    
    this.servicio.ahorro.obtenerPorId(ahorroId).subscribe({
      next: (data) => {
        //console.log(data)        
        this.ahorro = data
      },
      error: (data) => {
        console.log(data)
      }
    })
  }

  mover(movimiento: MovimientoDtoIn) {
    if (this.titulo == 'Deposito')
      this.depositar(movimiento)
    else
      this.retirar(movimiento)
  }

  retirar(movimiento: MovimientoDtoIn) {
    //console.log(movimiento)
    this.estaCargando = true
    this.servicio.ahorro.retirar(this.ahorroId, movimiento).subscribe({
      next: (data) => {
        // console.log(data)
        this.ahorro.retiros.push(
          {
            cantidad: movimiento.cantidad, 
            concepto: movimiento.concepto, 
            fechaDeRegistro: new Date(), 
            referencia: movimiento.referencia
          })
          this.botonDeCerrar.nativeElement.click()
          this.estaCargando = false
          this.ahorro.total = this.ahorro.total - movimiento.cantidad
      },
      error: (data) => {
        console.log(data)
        this.estaCargando = false
      }
    })
  }

  depositar(movimiento: MovimientoDtoIn) {
    //console.log(movimiento)
    this.estaCargando = true
    this.servicio.ahorro.depositar(this.ahorroId, movimiento).subscribe({
      next: (data) => {
        //console.log(data)
        this.ahorro.depositos.push(
          {
            cantidad: movimiento.cantidad, 
            concepto: movimiento.concepto, 
            fechaDeRegistro: new Date(), 
            referencia: movimiento.referencia
          })
          this.botonDeCerrar.nativeElement.click()
          this.estaCargando = false
          this.ahorro.total = this.ahorro.total + movimiento.cantidad
      },
      error: (data) => {
        console.log(data)
        this.estaCargando = false
      }
    })
  }

  estaCargando = false
  @ViewChild('botonDeCerrar') botonDeCerrar!: ElementRef
}
