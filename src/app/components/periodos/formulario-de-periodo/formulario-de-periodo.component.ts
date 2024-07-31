import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { VersionDto } from '../../../interfaces/version-dto';
import { ServicioService } from '../../../services/servicio.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PeriodoDtoIn } from '../../../interfaces/periodo-dto';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-formulario-de-periodo',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './formulario-de-periodo.component.html',
  styleUrl: './formulario-de-periodo.component.css'
})
export class FormularioDePeriodoComponent {
  versiones: VersionDto[] = []

  constructor(private servicio: ServicioService, private formbuilder: FormBuilder) {
    this.formGroup = this.formbuilder.group({
      versionId: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      fechaInicial: ['', [Validators.required]],
      fechaFinal: ['', [Validators.required]]
    })
    this.obtenerVersiones()
  }

  obtenerVersiones() {
    this.servicio.version.obtener().subscribe({
      next: (data) => {
        this.versiones = data
        //console.log(this.versiones)
      },
      error: (data) => {
        console.log(data)
      }
    })
  }

  guardar() {
    this.submitted = true
    if (this.formGroup.valid) {
      //console.log(this.formGroup.value)
      var periodo: PeriodoDtoIn = {
        fechaFinal: this.formGroup.value.fechaFinal,
        fechaInicial: this.formGroup.value.fechaInicial,
        guid: '',
        nombre: this.formGroup.value.nombre,
        versionId: this.formGroup.value.versionId
      }
      this.eventEmitter.emit(periodo)
    }else{
      if(this.formGroup.get('versionId')?.errors != null){
        this.inputVersion.nativeElement.focus()
      }else if(this.formGroup.get('nombre')?.errors != null){
        this.inputNombre.nativeElement.focus()
      }else if(this.formGroup.get('fechaInicial')?.errors != null){
        this.inputFechaInicial.nativeElement.focus()
      }else if(this.formGroup.get('fechaFinal')?.errors != null){
        this.inputFechaFinal.nativeElement.focus()
      }
    }
  }

  formGroup: any;
  @Output() eventEmitter: EventEmitter<PeriodoDtoIn> = new EventEmitter<PeriodoDtoIn>()
  @ViewChild('versionId') inputVersion!:ElementRef
  @ViewChild('nombre') inputNombre!:ElementRef
  @ViewChild('fechaInicial') inputFechaInicial!:ElementRef
  @ViewChild('fechaFinal') inputFechaFinal!:ElementRef
  submitted: boolean = false
  estaCargando: boolean = false
  get f() { return this.formGroup.controls }
}
