import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AhorroDto } from '../../../interfaces/ahorro-dto';
import { ServicioService } from '../../../services/servicio.service';
import { DetalleDto, DetalleDtoIn, VersionDtoIn } from '../../../interfaces/version-dto';
import { SubcategoriaDto } from '../../../interfaces/subcategoria-dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Guid } from '../../../../../helpers/Guid';

@Component({
  selector: 'app-formulario-de-version',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './formulario-de-version.component.html',
  styleUrl: './formulario-de-version.component.css'
})
export class FormularioDeVersionComponent {
  editar(detalle: DetalleDtoIn) {
    this.formGroupDetalleDeVersion.patchValue({
      nombre: detalle.nombre,
      cantidad: detalle.cantidad,
      ahorroId: detalle.ahorroId,
      guid: detalle.guid
    })
  }

  agregarDetalleDeVersion() {
    var detalle: DetalleDtoIn = {
      ahorroId: this.formGroupDetalleDeVersion.value.ahorroId,
      cantidad: this.formGroupDetalleDeVersion.value.cantidad,
      nombre: this.formGroupDetalleDeVersion.value.nombre,
      guid: Guid.newGuid()
    }
    console.log(detalle)
    this.servicio.version.agregarDetalle(this.versionId, detalle).subscribe({
      next:(data)=>{
        console.log(data)
        this.detalles.push(detalle)
      }, error: (data)=>{
        console.log(data)
      }
    })
  }

  ahorros: AhorroDto[] = []
  
  subcategorias: SubcategoriaDto[] = []

  constructor(private servicio: ServicioService, private formBuilder: FormBuilder) {
    this.obtenerAhorros()
    this.obtenerSubcategorias()
    //this.detalles.push({ ahorroId: '', cantidad: 0, nombre: '' })
    this.formGroup = this.formBuilder.group({
      nombre: '',
      fechaInicial: '',
      fechaFinal: ''
    })
    this.formGroupDetalleDeVersion = this.formBuilder.group({
      nombre: '',
      cantidad: 0,
      ahorroId: '',
      guid:''
    })
  }

  obtenerSubcategorias() {
    this.servicio.subcategoria.obtenerTodos().subscribe({
      next: (data) => {
        this.subcategorias = data
      },
      error: (data) => {
        console.log(data)
      }
    })
  }

  obtenerAhorros() {
    this.servicio.ahorro.obtener().subscribe({
      next: (data) => {
        this.ahorros = data
        //console.log(data)
      }
    })
  }

  agregarElemento() {
    this.detalles.push({ ahorroId: '', cantidad: 0, nombre: '', guid:'' })
  }

  guardarVersion() {
    var version: VersionDtoIn = {
      fechaFinal: this.formGroup.value.fechaFinal,
      fechaInicial: this.formGroup.value.fechaInicial,
      nombre: this.formGroup.value.nombre,
      guid: ''
    }
    this.versionEmitter.emit(version)
  }

  ngOnChanges(){
    if(this.version){
      console.log(this.version)
      this.formGroup.patchValue({
        nombre: this.version.nombre,
        fechaInicial: this.version.fechaInicial,
        fechaFinal: this.version.fechaFinal
      })      
    }
    console.log(this.detalles)
  }

  @Output() versionEmitter: EventEmitter<VersionDtoIn> = new EventEmitter<VersionDtoIn>();
  @Input() versionId: string = '0'
  @Input() version!: VersionDtoIn
  @Input() detalles: DetalleDto[] = []
  formGroup: FormGroup
  formGroupDetalleDeVersion: FormGroup
}
