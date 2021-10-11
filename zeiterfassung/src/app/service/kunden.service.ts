import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kunde } from '../shared/kunde';

@Injectable({
  providedIn: 'root'
})
export class KundenServices {


//api = "http://192.168.178.24/backend/decker/kunde";
private api ="https://jens-online.net/api";

  constructor(
    private http: HttpClient
  ) { }

//******************************************************************************* */
//                                  KUNDE
//******************************************************************************* */

addKunde(kunde: Kunde) {
  console.log(kunde);

}

getKunde(id: number):Observable<Kunde> {
  console.log(id);
  return this.http.get<Kunde>(`${this.api}/kunde/getKunde.php?id=${id}`)
}

getKunden():Observable<Kunde[]> {
  return this.http.get<Kunde[]>(`${this.api}/kunde/getKunden.php`)
}

delKunde(id: number):Observable<any> {
  return this.http.get<any>(`${this.api}/kunde/delKunde.php?id=${id}`)
}


}
