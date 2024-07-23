import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PeriodoDto } from '../../../interfaces/periodo-dto';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-lista-de-periodos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lista-de-periodos.component.html',
  styleUrl: './lista-de-periodos.component.css'
})
export class ListaDePeriodosComponent {
  periodos: PeriodoDto[]=[]

  constructor(private servicio: ServicioService){
    this.obtenerPeriodos()
  }

  obtenerPeriodos() {  
    this.servicio.periodo.obtener().subscribe({
      next:(data)=>{
        this.periodos = data
        console.log(data)
      }
    })
  }
}
