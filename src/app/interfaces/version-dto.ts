export interface VersionDto {
    id: string
    guid:string
    nombre: string
    detalles:DetalleDto[]
    fechaFinal: Date
    fechaInicial: Date
}

export interface VersionDtoIn {
    nombre: string
    fechaFinal: Date
    fechaInicial: Date
    guid: string
}

export interface DetalleDtoIn {
    cantidad: number
    nombre: string
    ahorroId: string
    guid: string
}

export interface DetalleDto {
    cantidad: number
    nombre: string
    ahorroId: string
    guid: string
}