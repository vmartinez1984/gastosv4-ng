import { Component } from '@angular/core';
import { FormularioDeVersionComponent } from "../formulario-de-version/formulario-de-version.component";
import { VersionDtoIn } from '../../../interfaces/version-dto';
import { ServicioService } from '../../../services/servicio.service';
import { Guid } from '../../../../../helpers/Guid';

@Component({
  selector: 'app-agregar-version',
  standalone: true,
  imports: [FormularioDeVersionComponent],
  templateUrl: './agregar-version.component.html',
  styleUrl: './agregar-version.component.css'
})
export class AgregarVersionComponent {
  guidVersion: string = Guid.newGuid()
  versionId: string = ''

  constructor(private servicio: ServicioService) { }

  guardarVersion(version: VersionDtoIn) {
    version.guid = this.guidVersion
    console.log(version)
    this.servicio.version.agregar(version).subscribe({
      next: (data) => {
        console.log(data)
        this.versionId= data.id
      }, error: (data) => {
        console.log(data)
      }
    })
  }
}
