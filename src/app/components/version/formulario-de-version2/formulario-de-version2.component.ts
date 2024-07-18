import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { VersionDtoIn } from '../../../interfaces/version-dto';

@Component({
  selector: 'app-formulario-de-version2',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-de-version2.component.html',
  styleUrl: './formulario-de-version2.component.css'
})
export class FormularioDeVersion2Component {
  formGroup: any;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      nombre: '',
      fechaInicial: '',
      fechaFinal: ''
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
