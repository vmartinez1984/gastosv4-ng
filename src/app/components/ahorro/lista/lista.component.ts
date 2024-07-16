import { Component } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { AhorroDto } from '../../../interfaces/ahorro-dto';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaDeAhorrosComponent {
  ahorros: AhorroDto[] = []
  estaCargando = false

  constructor(private servicio: ServicioService) {
    this.obtener()
  }
  obtener() {
    this.estaCargando = true
    this.servicio.ahorro.obtener().subscribe({
      next: (data) => {
        //console.log(data)
        this.ahorros = data
        this.estaCargando = false
      },
      error:(data)=>{
        console.log(data)
        this.estaCargando = false
      }
    })
  }
}
