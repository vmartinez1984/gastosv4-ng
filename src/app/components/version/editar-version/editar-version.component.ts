import { Component } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { ActivatedRoute } from '@angular/router';
import { DetalleDto, VersionDto } from '../../../interfaces/version-dto';
import { FormularioDeVersionComponent } from "../formulario-de-version/formulario-de-version.component";

@Component({
  selector: 'app-editar-version',
  standalone: true,
  imports: [FormularioDeVersionComponent],
  templateUrl: './editar-version.component.html',
  styleUrl: './editar-version.component.css'
})
export class EditarVersionComponent {
  id: string = ''
  version!: VersionDto
  detalles: DetalleDto[] = []

  constructor(private activatedRouter: ActivatedRoute, private servicio: ServicioService) {
    this.activatedRouter.params.subscribe(
      (data) => {
        this.obtenerVersion(data['id'])
        this.id = data['id']
      }
    )
  }

  obtenerVersion(id: string) {
    this.servicio.version.obtenerPorId(id).subscribe(
      {
        next: (data) => {
          console.log(data)
          this.version = data
          this.detalles = data.detalles
        }, error: (data) => {
          console.log(data)
        }
      }
    )
  }
}
