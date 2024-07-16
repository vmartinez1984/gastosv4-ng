import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TipoDeAhorroDto } from '../../../interfaces/tipo-de-ahorro-dto';
import { ServicioService } from '../../../services/servicio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AhorroDtoIn } from '../../../interfaces/ahorro-dto';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  tipoDeAhorros: TipoDeAhorroDto[] = []

  constructor(private servicio: ServicioService, private formBuilder: FormBuilder) {
    this.otenerTipoDeAhorros()
    this.formGroup = formBuilder.group({
      nombre: '',
      interes: 0,
      fechaInicial: '',
      fechaFinal: '',
      tipoDeAhorro: ''
    })
  }

  otenerTipoDeAhorros() {
    this.servicio.tipoDeAhorro.obtenerTodos().subscribe({
      next: (data) => {
        this.tipoDeAhorros = data
      }
    })
  }

  guardar() {
    var ahorro: AhorroDtoIn = {
      clienteId: '148318',
      guid: '',
      interes: this.formGroup.value.interes,
      nombre: this.formGroup.value.nombre,
      otros: {
        tipoDeAhorro: this.formGroup.value.tipoDeAhorro
      }
    }
    //console.log(ahorro)
    this.eventEmitter.emit(ahorro)
  }

  formGroup: FormGroup
  @Output() eventEmitter: EventEmitter<AhorroDtoIn> = new EventEmitter<AhorroDtoIn>()
}
