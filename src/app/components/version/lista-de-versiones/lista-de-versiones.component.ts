import { Component } from '@angular/core';
import { VersionDto, VersionDtoIn } from '../../../interfaces/version-dto';
import { ServicioService } from '../../../services/servicio.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormularioDeVersion2Component } from "../formulario-de-version2/formulario-de-version2.component";
import { Guid } from '../../../../../helpers/Guid';


@Component({
  selector: 'app-lista-de-versiones',
  standalone: true,
  imports: [DatePipe, RouterLink, FormularioDeVersion2Component],
  templateUrl: './lista-de-versiones.component.html',
  styleUrl: './lista-de-versiones.component.css'
})
export class ListaDeVersionesComponent {
  version!: VersionDto
  editar(version: VersionDto) {
    //console.log(version)
    this.version = version
  }

  versiones: VersionDto[] = []

  constructor(private servicio: ServicioService) {
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

  guardar(version: VersionDtoIn) {
    console.log(version)
    if (version.guid == '') {
      version.guid = Guid.newGuid()
      this.servicio.version.agregar(version).subscribe({
        next: (data) => {
          console.log(data)
          this.versiones.push({
            detalles: [],
            fechaFinal: version.fechaFinal,
            fechaInicial: version.fechaFinal,
            nombre: version.nombre,
            guid: version.guid,
            id: data.id
          })
        }
      })
    }
    else
      this.servicio.version.actualizar(version.guid, version).subscribe({
        next: (data) => {

        }
      })
  }
}