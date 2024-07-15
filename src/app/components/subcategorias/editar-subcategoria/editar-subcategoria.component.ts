import { Component } from '@angular/core';
import { FormularioDeSubcategoriaComponent } from "../formulario-de-subcategoria/formulario-de-subcategoria.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../../../services/servicio.service';
import { SubcategoriaDtoIn } from '../../../interfaces/subcategoria-dto';

@Component({
  selector: 'app-editar-subcategoria',
  standalone: true,
  imports: [FormularioDeSubcategoriaComponent],
  templateUrl: './editar-subcategoria.component.html',
  styleUrl: './editar-subcategoria.component.css'
})
export class EditarSubcategoriaComponent {
  subcategoria!: SubcategoriaDtoIn
  id!: string

  constructor(private servicio:ServicioService, private activatedRouter: ActivatedRoute, private route:Router){
    this.activatedRouter.params.subscribe(
      (data)=>{
        //console.log(data)
        this.obtenerSubcategoria(data['id'])
        this.id = data['id']
      }
    )
  }

  obtenerSubcategoria(id: string) {
    this.servicio.subcategoria.obtener(id).subscribe({
      next:(data)=>{
        this.subcategoria = data
        //console.log(data)
        //console.log(this.subcategoria)
        // this.subcategoria.cantidad = data.cantidad
        // this.subcategoria.categoria = data.categoria
        // this.subcategoria.esPrimario = data.esPrimario
        // this.subcategoria.nombre = data.nombre        
      },
      error:(data)=>{
        console.log(data)
      }
    })
  }  

  actualizar(subcategoria: SubcategoriaDtoIn){
    subcategoria.guid = this.subcategoria.guid
    //console.log(subcategoria)
    this.servicio.subcategoria.actualizar(this.id, subcategoria).subscribe({
      next:(data)=>{
        //console.log(data)
        this.route.navigate(['/','subcategorias'])
      },
      error:(data)=>{
        console.log(data)
      }
    })
  }

}