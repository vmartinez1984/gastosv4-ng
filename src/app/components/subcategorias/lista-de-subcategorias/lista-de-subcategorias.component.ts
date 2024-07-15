import { Component } from '@angular/core';
import { SubcategoriaService } from '../../../services/subcategoria.service';
import { SubcategoriaDto } from '../../../interfaces/subcategoria-dto';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-de-subcategorias',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './lista-de-subcategorias.component.html',
  styleUrl: './lista-de-subcategorias.component.css'
})
export class ListaDeSubcategoriasComponent {
  lista: SubcategoriaDto[]=[]
  total = 0;

  constructor(private servicio: SubcategoriaService) { 
    this.estaCargando = true
    this.servicio.obtenerTodos().subscribe({
      next:(data)=>{
        //console.log(data)
        this.lista = data
        data.forEach(item=>{
          this.total+= item.cantidad
        })
        this.estaCargando = false
      },
      error:(error)=>{
        console.log(error)
        this.estaCargando = false
      }
    })
  }

  estaCargando= false
}