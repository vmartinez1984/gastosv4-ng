import { Component, EventEmitter, Output } from '@angular/core';
import { VersionDto } from '../../../interfaces/version-dto';
import { ServicioService } from '../../../services/servicio.service';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PeriodoDtoIn } from '../../../interfaces/periodo-dto';

@Component({
  selector: 'app-formulario-de-periodo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-de-periodo.component.html',
  styleUrl: './formulario-de-periodo.component.css'
})
export class FormularioDePeriodoComponent {
  versiones: VersionDto[] = []

  constructor(private servicio: ServicioService, private formbuilder: FormBuilder) {
    this.formGroup = this.formbuilder.group({
      versionId: '',
      nombre: '',
      fechaInicial: '',
      fechaFinal: ''
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
    //console.log(this.formGroup.value)
    var periodo : PeriodoDtoIn ={
      fechaFinal : this.formGroup.value.fechaFinal,
      fechaInicial: this.formGroup.value.fechaInicial,
      guid: '',
      nombre: this.formGroup.value.nombre,
      versionId: this.formGroup.value.versionId
    }
    this.eventEmitter.emit(periodo)
  }

  formGroup: any;
  @Output() eventEmitter: EventEmitter<PeriodoDtoIn> = new EventEmitter<PeriodoDtoIn>()
}
