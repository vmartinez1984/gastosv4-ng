import { Routes } from '@angular/router';
import { ListaDeSubcategoriasComponent } from './components/subcategorias/lista-de-subcategorias/lista-de-subcategorias.component';
import { AgregarSubcategoriaComponent } from './components/subcategorias/agregar-subcategoria/agregar-subcategoria.component';
import { EditarSubcategoriaComponent } from './components/subcategorias/editar-subcategoria/editar-subcategoria.component';
import { ListaDeAhorrosComponent } from './components/ahorro/lista/lista.component';
import { AgregarVersionComponent } from './components/version/agregar-version/agregar-version.component';
import { AgregarAhorroComponent } from './components/ahorro/agregar/agregar.component';
import { ListaDeVersionesComponent } from './components/version/lista-de-versiones/lista-de-versiones.component';
import { EditarVersionComponent } from './components/version/editar-version/editar-version.component';
import { DetallesVersionComponent } from './components/version/detalles-version/detalles-version.component';

export const routes: Routes = [
    { path: 'subcategorias', component: ListaDeSubcategoriasComponent },
    { path: 'subcategorias/agregar', component: AgregarSubcategoriaComponent },
    { path: 'subcategorias/editar/:id', component: EditarSubcategoriaComponent },
    { path: 'ahorros', component: ListaDeAhorrosComponent },
    { path: 'ahorros/agregar', component: AgregarAhorroComponent },
    { path: 'versiones', component: ListaDeVersionesComponent },
    { path: 'versiones/agregar', component: AgregarVersionComponent },
    { path: 'versiones/editar/:id', component: EditarVersionComponent },
    { path: 'versiones/detalles/:id', component: DetallesVersionComponent },
];