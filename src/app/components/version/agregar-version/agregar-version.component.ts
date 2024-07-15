import { Component } from '@angular/core';
import { FormularioDeVersionComponent } from "../formulario-de-version/formulario-de-version.component";

@Component({
  selector: 'app-agregar-version',
  standalone: true,
  imports: [FormularioDeVersionComponent],
  templateUrl: './agregar-version.component.html',
  styleUrl: './agregar-version.component.css'
})
export class AgregarVersionComponent {

}
