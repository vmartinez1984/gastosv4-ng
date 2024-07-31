import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { VersionDtoIn } from '../../../interfaces/version-dto';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-formulario-de-version2',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './formulario-de-version2.component.html',
  styleUrl: './formulario-de-version2.component.css'
})
export class FormularioDeVersion2Component {  

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      fechaInicial: ['',[Validators.required]],
      fechaFinal: ['',[Validators.required]],
    })
  }

  guardarVersion() {
    var version: VersionDtoIn = {
      fechaFinal: this.formGroup.value.fechaFinal == "" ? null : this.formGroup.value.fechaFinal,
      fechaInicial: this.formGroup.value.fechaInicial == "" ? null : this.formGroup.value.fechaInicial,
      nombre: this.formGroup.value.nombre,
      guid: this.version == undefined ? '' : this.version.guid
    }
    this.versionEmitter.emit(version)
  }

  submitted: boolean = false
  estaCargando: boolean = false
  get f() { return this.formGroup.controls }
  formGroup: any
  @Output() versionEmitter: EventEmitter<VersionDtoIn> = new EventEmitter<VersionDtoIn>();
  @Input() version!: VersionDtoIn

  ngOnChanges() {
    if (this.version) {
      //console.log(this.version)
      this.formGroup.patchValue({
        nombre: this.version.nombre,
        fechaInicial: this.version.fechaInicial,
        fechaFinal: this.version.fechaFinal
      })
    }
  }
}
