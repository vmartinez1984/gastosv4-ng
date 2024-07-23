import { Component } from '@angular/core';
import { FormularioDeMovimientoComponent } from "../formulario-de-movimiento/formulario-de-movimiento.component";
import { ServicioService } from '../../../services/servicio.service';
import { MovimientoDtoIn } from '../../../interfaces/ahorro-dto';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-retirar',
  standalone: true,
  imports: [FormularioDeMovimientoComponent, RouterLink],
  templateUrl: './retirar.component.html',
  styleUrl: './retirar.component.css'
})
export class RetirarComponent {
  ahorroId = ''

  constructor(
    private servicio: ServicioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe({
      next: (data) => {
        this.ahorroId = data['id']
      }
    })
  }

  retirar(movimiento: MovimientoDtoIn) {
    console.log(movimiento)
    this.servicio.ahorro.retirar(this.ahorroId, movimiento).subscribe({
      next:(data)=>{
        console.log(data)
      }, 
      error:(data)=>{
        console.log(data)
      }
    })
  }

}