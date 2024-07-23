import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TipoDeAhorroDto } from '../../../interfaces/tipo-de-ahorro-dto';
import { ServicioService } from '../../../services/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AhorroDtoIn } from '../../../interfaces/ahorro-dto';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  tipoDeAhorros: TipoDeAhorroDto[] = []
  estaCargandoTipoDeAhorro = false

  constructor(private servicio: ServicioService, private formBuilder: FormBuilder) {
    this.otenerTipoDeAhorros()
    this.formGroup = formBuilder.group({
      nombre: ['', [Validators.required]],
      interes: 0,
      fechaInicial: '',
      fechaFinal: '',
      tipoDeAhorro: ['', [Validators.required]]
    })
  }

  otenerTipoDeAhorros() {
    this.estaCargandoTipoDeAhorro = true
    this.servicio.tipoDeAhorro.obtenerTodos().subscribe({
      next: (data) => {
        this.tipoDeAhorros = data
        this.estaCargandoTipoDeAhorro = false
      },
      error: (data) => {
        console.log(data)
        this.estaCargandoTipoDeAhorro = false
      }
    })
  }

  guardar() {
    this.submitted = true
    if (this.formGroup.valid) {
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
    }else{
      if(this.formGroup.get('nombre')?.errors != null){
        this.inputNombre.nativeElement.focus()
      }else if(this.formGroup.get('tipoDeAhorro')?.errors != null){
        this.inputTipoDeCuentaId.nativeElement.focus()
      }
    }
  }

  habilitarFormulario(estaCargando: boolean) {
    if (estaCargando) {
      this.formGroup.get('nombre')?.disable()
      this.formGroup.get('interes')?.disable()
      this.formGroup.get('fechaInicial')?.disable()
      this.formGroup.get('fechaFinal')?.disable()
      this.formGroup.get('tipoDeAhorro')?.disable()
    } else {
      this.formGroup.get('nombre')?.enable()
      this.formGroup.get('interes')?.enable()
      this.formGroup.get('fechaInicial')?.enable()
      this.formGroup.get('fechaFinal')?.enable()
      this.formGroup.get('tipoDeAhorro')?.enable()
    }
  }

  ngOnInit(){
    setTimeout(() => {
      this.inputNombre.nativeElement.focus()
    }, 500)    
  }

  ngOnChanges() {
    this.habilitarFormulario(this.estaCargando)
    console.log(this.estaCargando)
  }

  submitted: boolean = false
  get f() { return this.formGroup.controls }
  formGroup: FormGroup
  @Output() eventEmitter: EventEmitter<AhorroDtoIn> = new EventEmitter<AhorroDtoIn>()
  @Input() estaCargando: boolean = false

  @ViewChild('nombre') inputNombre! :ElementRef  
  @ViewChild('tipoDeAhorro') inputTipoDeCuentaId! :ElementRef  
}
