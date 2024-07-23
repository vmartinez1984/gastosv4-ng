import { Component } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-de-ahorro',
  standalone: true,
  imports: [],
  templateUrl: './detalle-de-ahorro.component.html',
  styleUrl: './detalle-de-ahorro.component.css'
})
export class DetalleDeAhorroComponent {
  ahorroId: string =''

  constructor(    
    private servicio: ServicioService,     
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe({
      next:(data)=>{
        this.ahorroId = data['id']
      }
    })
    this.obtenerAhorro(this.ahorroId)
  }

  obtenerAhorro(ahorroId: string) {
    this.servicio.ahorro.obtenerPorId(ahorroId).subscribe({
      next:(data)=>{
        console.log(data)
      },
      error:(data)=>{
        console.log(data)
      }
    })
  }
}
