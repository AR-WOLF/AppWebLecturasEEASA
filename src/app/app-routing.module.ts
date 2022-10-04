import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginOutGuard } from './data/guards/login-out.guard';
import { SessionGuard } from './data/guards/session.guard';
import { LecturasComponent } from './layouts/lecturas/lecturas.component';
import { ListaMedicionesComponent } from './layouts/lista-mediciones/lista-mediciones.component';
import { LoginComponent } from './layouts/login/login.component';
import { SkeletonComponent } from './layouts/skeleton/skeleton.component';

const routes: Routes = [

  {
    path: '', component: SkeletonComponent, canActivate:[SessionGuard],
    children:[
      {path:'lecturas', component: LecturasComponent},
      {path:'lecturas/:cuenta', component: LecturasComponent},
      {path:'lista-mediciones', component: ListaMedicionesComponent},


      {path:'', component: LecturasComponent}
    ]
  },

  { path:'login', component:LoginComponent, canActivate:[LoginOutGuard]},
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
