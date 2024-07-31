export interface AhorroDto {
    id: string
    guid: string
    nombre: string
    total: number
    clienteId: string
    interes: number
    fechaDeRegistro: Date
    depositos: MovimientoDto[]
    retiros: MovimientoDto[]
    otros: OtroDto
}

interface OtroDto {
    fechaInicial: string;
    fechaFinal: string;
    nota: string;
    tipoDeCuenta: string;
}

export interface MovimientoDto{
    cantidad: number
    concepto:string
    referencia: string
    fechaDeRegistro: Date
}

export interface AhorroDtoIn {
    guid: string
    nombre: string    
    clienteId: string
    interes: number
    otros: {}
}

export interface MovimientoDtoIn{
    cantidad: number
    concepto:string
    referencia: string
}
