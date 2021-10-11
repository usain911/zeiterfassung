import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common'
import localeDe from '@angular/common/locales/de'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/token.interceptor';

import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './menu/menu.component';
import { ZeitEingabeComponent } from './zeit-eingabe/zeit-eingabe.component';
import { ZeitAusgabeComponent } from './zeit-ausgabe/zeit-ausgabe.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button'
import {MatSelectModule} from '@angular/material/select';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AddKundeComponent } from './add-kunde/add-kunde.component';
import { MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {NgxPrintModule} from 'ngx-print';

import { NeuerKundeComponent } from './kunde/neuer-kunde/neuer-kunde.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddMitarbeiterComponent } from './add-mitarbeiter/add-mitarbeiter.component';
import { KundenListeComponent } from './kunde/kunden-liste/kunden-liste.component';
import { MitarbeiterlisteComponent } from './mitarbeiterliste/mitarbeiterliste.component';
import { DetailsComponent } from './kunde/details/details.component';
import { EditKundeComponent } from './kunde/edit-kunde/edit-kunde.component';
import { MitarbeiterComponent } from './mitarbeiter/mitarbeiter.component';
import { EditStundenComponent } from './edit-stunden/edit-stunden.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { MatOkayDialogComponent } from './mat-okay-dialog/mat-okay-dialog.component'

import { MatTableExporterModule } from 'mat-table-exporter';
import { TableComponent } from './table/table.component';
import { TableMaComponent } from './table-ma/table-ma.component';
import { MatMessageDialogComponent } from './mat-message-dialog/mat-message-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ZeitEingabeComponent,
    ZeitAusgabeComponent,
    DashboardComponent,
    FooterComponent,
    LoginComponent,
    AddKundeComponent,
    NeuerKundeComponent,
    PageNotFoundComponent,
    AddMitarbeiterComponent,
    KundenListeComponent,
    MitarbeiterlisteComponent,
    DetailsComponent,
    EditKundeComponent,
    MitarbeiterComponent,
    EditStundenComponent,
    ConfirmationDialogComponent,
    MatConfirmDialogComponent,
    MatOkayDialogComponent,
    TableComponent,
    TableMaComponent,
    MatMessageDialogComponent,

  ],
  imports: [NgxPrintModule,
    BrowserModule,
    AppRoutingModule, MatSnackBarModule, MatDialogModule, MatTableExporterModule,
    BrowserAnimationsModule, ReactiveFormsModule, HttpClientModule, MatSlideToggleModule,
    MatMenuModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,MatInputModule,MatCardModule,
    MatIconModule, MatSelectModule, MatListModule, MatTableModule, MatRadioModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the app is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de'},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
  multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe);
  }
}
