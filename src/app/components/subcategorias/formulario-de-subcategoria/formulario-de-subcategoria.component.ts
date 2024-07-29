import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CategoriaDto } from '../../../interfaces/categoria-dto';
import { ServicioService } from '../../../services/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SubcategoriaDtoIn } from '../../../interfaces/subcategoria-dto';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-formulario-de-subcategoria',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './formulario-de-subcategoria.component.html',
  styleUrl: './formulario-de-subcategoria.component.css'
})
export class FormularioDeSubcategoriaComponent {
  categorias: CategoriaDto[] = []

  guardar() {
    this.submitted = true
    if (this.formGroup.valid) {
      //console.log(this.formGroup.value)
      var subcategoria: SubcategoriaDtoIn = {
        cantidad: this.formGroup.value.cantidad,
        categoria: this.formGroup.value.categoria,
        esPrimario: this.formGroup.value.esPrimario,
        guid: "",
        nombre: this.formGroup.value.nombre
      }
      this.emitter.emit(subcategoria)
    }else{
      if(this.formGroup.get('nombre')?.errors != null){
        this.inputNombre.nativeElement.focus()
      }else if(this.formGroup.get('cantidad')?.errors != null){
        this.inputCantidad.nativeElement.focus()
      }
    }
  }

  constructor(private servicio: ServicioService, private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      nombre: ['', [Validators.required]],
      cantidad: [0, [Validators.min(1), Validators.max(3500)]],
      categoria: ['', [Validators.required]],
      esPrimario: false
    })
    this.servicio.categoria.obtenerTodos().subscribe({
      next: (data) => {
        this.categorias = data
      }
    })

  }

  submitted: boolean = false
  estaCargando: boolean = false
  get f() { return this.formGroup.controls }
  formGroup: any
  @Output() emitter: EventEmitter<SubcategoriaDtoIn> = new EventEmitter<SubcategoriaDtoIn>()
  @Input() subcategoria!: SubcategoriaDtoIn
  @ViewChild('nombre') inputNombre! :ElementRef  
  @ViewChild('cantidad') inputCantidad! :ElementRef  
  
  ngOnChanges() {
    if (this.subcategoria) {
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
