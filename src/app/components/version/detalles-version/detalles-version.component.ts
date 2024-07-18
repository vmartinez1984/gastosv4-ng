import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../../../services/servicio.service';
import { DetalleDtoIn, VersionDto } from '../../../interfaces/version-dto';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AhorroDto } from '../../../interfaces/ahorro-dto';
import { SubcategoriaDto } from '../../../interfaces/subcategoria-dto';
import { ReactiveFormsModule } from '@angular/forms';
import { Guid } from '../../../../../helpers/Guid';

@Component({
  selector: 'app-detalles-version',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './detalles-version.component.html',
  styleUrl: './detalles-version.component.css'
})
export class DetallesVersionComponent {
  version!: VersionDto
  //detalles: DetalleDto[] = []
  id: any;
  ahorros: AhorroDto[] = []
  subcategorias: SubcategoriaDto[] = []

  constructor(private activatedRouter: ActivatedRoute, private servicio: ServicioService, private formBuilder: FormBuilder) {
    this.activatedRouter.params.subscribe(
      (data) => {
        this.obtenerVersion(data['id'])
        this.id = data['id']
      }
    )
    this.obtenerAhorros()
    this.obtenerSubcategorias()
    this.formGroup = this.formBuilder.group({
      nombre: '',
      cantidad: 0,
      ahorroId: '',
      guid: ''
    })
  }

  agregar() {
    var detalle: DetalleDtoIn = {
      ahorroId: this.formGroup.value.ahorroId,
      cantidad: this.formGroup.value.cantidad,
      nombre: this.formGroup.value.nombre,
      guid: this.formGroup.value.guid == '' ? Guid.newGuid() : this.formGroup.value.guid
    }
    console.log(detalle)
    if (this.formGroup.value.guid == '' || this.formGroup.value.guid == null) {
      this.habilitarFormulario(false)
      this.servicio.version.agregarDetalle(this.id, detalle).subscribe({
        next: (data) => {
          console.log(data)
          this.limpiarFormulario
          this.version.detalles.push(detalle)
          this.habilitarFormulario(true)
        }, error: (data) => {
          console.log(data)
        }
      })
    } else {
      this.servicio.version.actualizarDetalle(this.id, detalle).subscribe({
        next: (data) => {
          console.log(data)
          this.limpiarFormulario()
        }, error: (data) => {
          console.log(data)
        }
      })
    }
  }

  limpiarFormulario() {
    this.formGroup.patchValue({
      nombre: '',
      cantidad: '',
      ahorroId: '',
      guid: ''
    })
  }

  habilitarFormulario(habilitar: boolean) {
    if (habilitar) {
      this.formGroup.get('nombre')?.enable()
      this.formGroup.get('cantida')?.enable()
      this.formGroup.get('ahorroId')?.enable()
      this.formGroup.get('guid')?.enable()
    } else {
      this.formGroup.get('nombre')?.disable()
      this.formGroup.get('cantida')?.disable()
      this.formGroup.get('ahorroId')?.disable()
      this.formGroup.get('guid')?.disable()
    }
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

  obtenerVersion(id: string) {
    this.servicio.version.obtenerPorId(id).subscribe(
      {
        next: (data) => {
          //console.log(data)
          this.version = data
          //this.detalles = data.detalles
        }, error: (data) => {
          console.log(data)
        }
      }
    )
  }

  editar(detalle: DetalleDtoIn) {
    this.formGroup.patchValue({
      nombre: detalle.nombre,
      cantidad: detalle.cantidad,
      ahorroId: detalle.ahorroId,
      guid: detalle.guid
    })
  }

  formGroup: FormGroup
}
