import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoriaDto } from '../../../interfaces/categoria-dto';
import { ServicioService } from '../../../services/servicio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SubcategoriaDtoIn } from '../../../interfaces/subcategoria-dto';

@Component({
  selector: 'app-formulario-de-subcategoria',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-de-subcategoria.component.html',
  styleUrl: './formulario-de-subcategoria.component.css'
})
export class FormularioDeSubcategoriaComponent {
  categorias: CategoriaDto[] = []

  guardar() {
    //console.log(this.formGroup.value)
    var subcategoria: SubcategoriaDtoIn = {
      cantidad: this.formGroup.value.cantidad,
      categoria: this.formGroup.value.categoria,
      esPrimario: this.formGroup.value.esPrimario,
      guid: "",
      nombre: this.formGroup.value.nombre
    }
    this.emitter.emit(subcategoria)
  }

  constructor(private servicio: ServicioService, private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      nombre: '',
      cantidad: 0,
      categoria: '',
      esPrimario: false
    })
    this.servicio.categoria.obtenerTodos().subscribe({
      next: (data) => {
        this.categorias = data
      }
    })

  }

  formGroup: FormGroup
  @Output() emitter: EventEmitter<SubcategoriaDtoIn> = new EventEmitter<SubcategoriaDtoIn>()
  @Input() subcategoria!: SubcategoriaDtoIn

  ngOnChanges(){
    if(this.subcategoria){
      console.log(this.subcategoria)
      this.formGroup.patchValue({
        nombre: this.subcategoria.nombre,
        categoria: this.subcategoria.categoria,
        cantidad: this.subcategoria.cantidad,
        esPrimario: this.subcategoria.esPrimario
      })
    }
  }
}
