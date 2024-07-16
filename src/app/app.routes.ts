import { Routes } from '@angular/router';
import { ListaDeSubcategoriasComponent } from './components/subcategorias/lista-de-subcategorias/lista-de-subcategorias.component';
import { AgregarSubcategoriaComponent } from './components/subcategorias/agregar-subcategoria/agregar-subcategoria.component';
import { EditarSubcategoriaComponent } from './components/subcategorias/editar-subcategoria/editar-subcategoria.component';
import { ListaDeAhorrosComponent } from './components/ahorro/lista/lista.component';
import { AgregarVersionComponent } from './components/version/agregar-version/agregar-version.component';
import { AgregarAhorroComponent } from './components/ahorro/agregar/agregar.component';



export const routes: Routes = [
    { path: 'subcategorias', component: ListaDeSubcategoriasComponent },
    { path: 'subcategorias/agregar', component: AgregarSubcategoriaComponent },
    { path: 'subcategorias/editar/:id', component: EditarSubcategoriaComponent },
    { path: 'ahorros', component: ListaDeAhorrosComponent},
    { path: 'ahorros/agregar', component: AgregarAhorroComponent},
    { path: 'versiones/agregar', component: AgregarVersionComponent}
];
