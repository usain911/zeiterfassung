import { Injectable } from '@angular/core';
import { StundenzettelTag } from '../shared/stundenzettel-tag';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mitarbeiter } from '../shared/mitarbeiter';
import { Kunde } from '../shared/kunde';
import { StundenzettelRaw } from '../shared/stundenzettel-raw';
import { StundenzettelAbfrage } from '../shared/stundenzettel-abfrage';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Router } from '@angular/router';
import { Login } from '../shared/login';
import { DialogService } from '../shared/dialog.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class StundenService {
  //private backend =  "http://localhost:3000";
  private api ="http://192.168.178.24/backend/decker";
  //private api ="https://jens-online.net/api";
  public onWork : boolean = false;

  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private ds: DialogService
  ) { }


  //******************************************************************************* */
  //                                Stunden
  //******************************************************************************* */


  addStunden(stundenzettel: StundenzettelRaw) {
    return this.http.post<Response>(`${this.api}/stunden/addStunden.php`, stundenzettel).subscribe({
           next: data => {
             console.log(data);
             //alert("Daten geschrieben");
           },
           error: error => {
            console.error('There was an error!', error);
           }

         })

  }

  getStundenzettel(abfrage: StundenzettelAbfrage):Observable<any> {
    return this.http.post<any>(`${this.api}/stunden/getStunden.php`, abfrage)
  }

  getStundensatz(id: number) {
    console.log((id));
    return this.http.get<any>(`${this.api}/stunden/getStundensatz.php?id=${id}` )
  }

  delStundensatz(id: number) {
    return this.http.get<any>(`${this.api}/stunden/delStundensatz.php?id=${id}` )
  }

  updateStundensatz(stunden: StundenzettelRaw) {
    console.log("ss: " + stunden);
    return this.http.post<any>(`${this.api}/stunden/updateStundensatz.php`, stunden).subscribe();
  }

  //******************************************************************************* */
  //                                Mitarbeiter
  //******************************************************************************* */

  getAllMitarbeiter():Observable<Mitarbeiter[]> {
    return this.http.get<Mitarbeiter[]>(`${this.api}/ma/getAllMitarbeiter.php`)
  }

  getMitarbeiter(id: number):Observable<Mitarbeiter> {
    return this.http.get<Mitarbeiter>(`${this.api}/ma/getMitarbeiter.php?id=${id}`)
  }

  //behandlung noch auf mitarbeiter seite
  addMitarbeiter(ma: Mitarbeiter):Observable<any> {
    //console.log(ma);
    return this.http.post<any>(`${this.api}/ma/addMitarbeiter.php`, ma)
  }

  delMitarbeiter(id: number): string {
    this.http.get<Message>(`${this.api}/ma/delMitarbeiter.php?id=${id}`).toPromise().then((res: any) => {
      if(res) {
        return res
      } else if(res.Message)
        alert(res.Message)
        return "fehler"
    })
    return "fehler"
  }

  updateMa(ma: Mitarbeiter):Observable<any> {
    return this.http.post<any>(`${this.api}/ma/updateMa.php`, ma)
  }

  async updatePw(login: Login) {
    //console.log(login);
    return this.http.post(`${this.api}/ma/setNewPw.php`, login).toPromise().then((res: any) => {
      if(res) {
        if(res) {
          this.ds.openOkDialog();
          this.router.navigateByUrl('mitarbeiterliste');
        }
        this.errorSubject.next(null);
      } else if(res.Message) {
        this.errorSubject.next(res.Message)
      }
    }
    )
  }


  //******************************************************************************* */
  //                                Hilfsfunktionen
  //******************************************************************************* */

  getMonate() {
    //return this.monate
  }

 getMid():number {
   let mid = localStorage.getItem("auth")
   if(mid) {
     return parseInt(mid)
   }
   return 0
 }

  getApi():string {
    return this.api
  }

  getWorkingStatus():boolean {
    return this.onWork
  }


  //******************************************************************************* */
  //                                 Kunden
  //******************************************************************************* */

  getKunde(id: number):Observable<Kunde> {
    console.log(id);
    return this.http.get<Kunde>(`${this.api}/kunde/getKunde.php?id=${id}`)
  }

  getKunden():Observable<Kunde[]> {
    return this.http.get<Kunde[]>(`${this.api}/kunde/getKunden.php`)
  }

  delKunde(id: number) {
    this.http.get<any>(`${this.api}/kunde/delKunde.php?id=${id}`).toPromise().then(( res: any) => {
      if(res) {
        this.ds.openMessageDialog("Kunde gelöscht")
        this.router.navigateByUrl("kundeliste")
      } else {
        this.ds.openMessageDialog("Fehler");
      }
    })

  }

  addKunde(kunde: Kunde) {
    this.http.post<Kunde>(`${this.api}/kunde/addKunde.php`, kunde).toPromise().then(( res: any ) => {
      if(res) {
        this.ds.openMessageDialog("Kunde angelegt");
        this.router.navigateByUrl("kundeliste");
      } else {
        this.ds.openMessageDialog("Fehlert");
      }

    })
  }

  updateKunde(kunde: Kunde) {
    this.http.post<any>(`${this.api}/kunde/updateKunde.php`, kunde).toPromise().then(( res: any) => {
      if(res) {
        this.ds.openMessageDialog("Daten geändert");
        this.router.navigateByUrl("kundeliste");
      } else {
        this.ds.openMessageDialog("Fehler");
      }
    })
  }

}
