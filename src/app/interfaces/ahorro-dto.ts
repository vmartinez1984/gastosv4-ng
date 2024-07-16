export interface AhorroDto {
    id: string
    guid: string
    nombre: string
    total: number
    clienteId: string
    interes: number
    fechaDeRegistro: Date
}

export interface AhorroDtoIn {
    guid: string
    nombre: string    
    clienteId: string
    interes: number
    otros: {}
}


