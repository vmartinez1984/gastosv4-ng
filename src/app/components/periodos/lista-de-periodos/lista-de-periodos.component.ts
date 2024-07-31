import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PeriodoDto, PeriodoDtoIn } from '../../../interfaces/periodo-dto';
import { ServicioService } from '../../../services/servicio.service';
import { FormularioDePeriodoComponent } from "../formulario-de-periodo/formulario-de-periodo.component";
import { Guid } from '../../../../../helpers/Guid';

@Component({
  selector: 'app-lista-de-periodos',
  standalone: true,
  imports: [RouterLink, FormularioDePeriodoComponent],
  templateUrl: './lista-de-periodos.component.html',
  styleUrl: './lista-de-periodos.component.css'
})
export class ListaDePeriodosComponent {
  titulo= ''
  mostrarFormulario(titulo: string){
    this.titulo = titulo
  }

  agregar(periodo: PeriodoDtoIn) {
    periodo.guid = Guid.newGuid()
    console.log(periodo)
  }
  periodos: PeriodoDto[] = []

  constructor(private servicio: ServicioService) {
    this.obtenerPeriodos()
  }

  obtenerPeriodos() {
    this.servicio.periodo.obtener().subscribe({
      next: (data) => {
        this.periodos = data
        //console.log(data)
      }
    })
  }
  
}
