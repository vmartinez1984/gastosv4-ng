import { Component } from '@angular/core';
import { FormularioDePeriodoComponent } from "../formulario-de-periodo/formulario-de-periodo.component";
import { PeriodoDtoIn } from '../../../interfaces/periodo-dto';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-agregar-periodo',
  standalone: true,
  imports: [FormularioDePeriodoComponent],
  templateUrl: './agregar-periodo.component.html',
  styleUrl: './agregar-periodo.component.css'
})
export class AgregarPeriodoComponent {

  constructor(private servicio: ServicioService){

  }

  guardar(periodo: PeriodoDtoIn){
    console.log(periodo)
    this.servicio.periodo.agregar(periodo).subscribe({
      next: (data)=>{
        console.log(data)
      }, error:(data)=>{
        console.log(data)
      }
    })
  }
}
