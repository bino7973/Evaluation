import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CourrierSupprimerService {

  API_BASE_URL = environment.apiUrl+'/courrierSupprimes';

  constructor(private httpClient : HttpClient) { }

  getCourrierSupprimerFromServer() : Observable<any>{
    return this.httpClient.get(this.API_BASE_URL);
  }

}
