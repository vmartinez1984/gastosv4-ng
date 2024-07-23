import { Component } from '@angular/core';
import { FormularioComponent } from "../formulario/formulario.component";
import { AhorroDtoIn } from '../../../interfaces/ahorro-dto';
import { Guid } from '../../../../../helpers/Guid';
import { ServicioService } from '../../../services/servicio.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [FormularioComponent, RouterLink],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarAhorroComponent {
  guid: string = ''
  estaCargando = false

  constructor(private servicio: ServicioService, private route:Router) {
    this.guid = Guid.newGuid()
  }

  guardar(ahorro: AhorroDtoIn) {
    this.estaCargando = true
    ahorro.guid = this.guid
    //console.log(ahorro)
    this.servicio.ahorro.agregar(ahorro).subscribe({
      next: (data)=>{
        console.log(data)
        this.route.navigateByUrl('/ahorros')
        this.estaCargando = false
      },
      error:(data)=>{
        console.log(data)
        this.estaCargando = false
      }
    })
  }

}