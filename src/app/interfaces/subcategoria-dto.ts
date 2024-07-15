export interface SubcategoriaDto {
    id:string
    guid:string
    nombre:string
    cantidad: number
    categoria: string
    fechaDeRegistro: Date
    esPrimario: boolean
}

export interface SubcategoriaDtoIn{
    guid:string
    nombre:string
    cantidad: number
    categoria: string    
    esPrimario: boolean
}