import { Component } from '@angular/core';
import { FormularioDeSubcategoriaComponent } from "../formulario-de-subcategoria/formulario-de-subcategoria.component";
import { SubcategoriaDtoIn } from '../../../interfaces/subcategoria-dto';
import { Guid } from '../../../../../helpers/Guid';
import { ServicioService } from '../../../services/servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-subcategoria',
  standalone: true,
  imports: [FormularioDeSubcategoriaComponent],
  templateUrl: './agregar-subcategoria.component.html',
  styleUrl: './agregar-subcategoria.component.css'
})
export class AgregarSubcategoriaComponent {
  guid: string = Guid.newGuid()

  guardar(subcategoria: SubcategoriaDtoIn) {
    subcategoria.guid = this.guid
    console.log(subcategoria)
    this.servicio.subcategoria.agregar(subcategoria).subscribe({
      next:(data)=>{
        console.log(data)
        this.route.navigate(['/','subcategorias'])
      },
      error:(data)=>{
        console.log(data)
      }
    })
  }

  constructor(private servicio: ServicioService, private route:Router){    
  }  
}