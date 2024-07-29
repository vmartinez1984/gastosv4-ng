import { Component, ElementRef, ViewChild } from '@angular/core';
import { SubcategoriaService } from '../../../services/subcategoria.service';
import { SubcategoriaDto, SubcategoriaDtoIn } from '../../../interfaces/subcategoria-dto';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormularioDeSubcategoriaComponent } from "../formulario-de-subcategoria/formulario-de-subcategoria.component";
import { ServicioService } from '../../../services/servicio.service';
import { Guid } from '../../../../../helpers/Guid';

@Component({
  selector: 'app-lista-de-subcategorias',
  standalone: true,
  imports: [RouterModule, CurrencyPipe, FormularioDeSubcategoriaComponent],
  templateUrl: './lista-de-subcategorias.component.html',
  styleUrl: './lista-de-subcategorias.component.css'
})
export class ListaDeSubcategoriasComponent {
  subcategoria!: SubcategoriaDto
  actualizar(subcategoria: SubcategoriaDto) {
    this.titulo = "Actualizar"
    this.subcategoria = subcategoria
    console.log(subcategoria)
  }

  guardar(subcategoria: SubcategoriaDtoIn) {
    console.log(subcategoria)
    if (this.titulo == "Agregar") {
      subcategoria.guid = Guid.newGuid()
      this.servicio.subcategoria.agregar(subcategoria).subscribe({
        next: (data) => {
          console.log(data)
          this.lista.push(data)
          this.calcularTotal()
        },
        error: (data) => {
          console.log(data)
        }
      })
    } else {
      this.servicio.subcategoria.actualizar(this.subcategoria.id, subcategoria).subscribe({
        next: (data) => {
          //console.log(data)
          var index = this.lista.findIndex(x=>x.id == this.subcategoria.id)
          this.lista[index].cantidad = subcategoria.cantidad
          this.lista[index].categoria = subcategoria.categoria
          this.lista[index].esPrimario = subcategoria.esPrimario
          this.lista[index].nombre = subcategoria.nombre
          this.calcularTotal()
          this.botonDeCerrar.nativeElement.click()
        },
        error: (data) => {
          console.log(data)
        }
      })
    }
  }
  titulo = ''
  agregar() {
    this.titulo = "Agregar"
  }
  lista: SubcategoriaDto[] = []
  total = 0;
  @ViewChild('botonDeCerrar') botonDeCerrar!: ElementRef

  constructor(private servicio: ServicioService) {
    this.estaCargando = true
    this.servicio.subcategoria.obtenerTodos().subscribe({
      next: (data) => {
        //console.log(data)
        this.lista = data
        this.calcularTotal()
        this.estaCargando = false
      },
      error: (error) => {
        console.log(error)
        this.estaCargando = false
      }
    })
  }

  calcularTotal(){
    this.total = 0
    this.lista.forEach(item => {
      this.total += item.cantidad
    }) 
  }
  estaCargando = false
}