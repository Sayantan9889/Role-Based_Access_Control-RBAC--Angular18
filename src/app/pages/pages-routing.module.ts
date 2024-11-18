import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages.component').then((m) => m.PagesComponent),
    children: [
      { path: '', redirectTo: "home", pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
