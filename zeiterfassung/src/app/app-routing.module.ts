import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NeuerKundeComponent } from './kunde/neuer-kunde/neuer-kunde.component';
import { ZeitAusgabeComponent } from './zeit-ausgabe/zeit-ausgabe.component';
import { ZeitEingabeComponent } from './zeit-eingabe/zeit-eingabe.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { AddMitarbeiterComponent } from './add-mitarbeiter/add-mitarbeiter.component';
import { KundenListeComponent } from './kunde/kunden-liste/kunden-liste.component';
import { MitarbeiterlisteComponent } from './mitarbeiterliste/mitarbeiterliste.component';
import { DetailsComponent } from './kunde/details/details.component';
import { AddKundeComponent } from './add-kunde/add-kunde.component';
import { MitarbeiterComponent } from './mitarbeiter/mitarbeiter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CanNavigateToAdminGuard } from './can-navigate-to-admin.guard';
import { CanNavigateToLoginGuard } from './can-navigate-to-login.guard';
import { TableComponent } from './table/table.component';

const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent, canActivate: [CanNavigateToLoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'zeitEingabe', component: ZeitEingabeComponent, canActivate: [CanNavigateToLoginGuard] },
  { path: 'zeitAusgabe', component: ZeitAusgabeComponent, canActivate: [CanNavigateToLoginGuard] },
  { path: 'neuerKunde', component: NeuerKundeComponent, canActivate: [CanNavigateToAdminGuard] },
  { path: 'neuerMitarbeiter', component: AddMitarbeiterComponent, canActivate: [CanNavigateToAdminGuard] },
  { path: 'mitarbeiter/:id', component: MitarbeiterComponent, canActivate: [CanNavigateToAdminGuard] },

  { path: 'kundeliste', component: KundenListeComponent, canActivate: [CanNavigateToLoginGuard] },
  { path: 'kundendetails/:id', component: DetailsComponent, canActivate: [CanNavigateToAdminGuard] },
  { path: 'test', component: AddKundeComponent },
  { path: 'mitarbeiterliste', component: MitarbeiterlisteComponent, canActivate: [CanNavigateToAdminGuard] },
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  { path: 'table', component: TableComponent, canActivate: [CanNavigateToAdminGuard] },
  {path: '**', component: DashboardComponent, canActivate: [CanNavigateToLoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
