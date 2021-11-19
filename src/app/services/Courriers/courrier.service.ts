import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CourrierModel} from "../../models/courrier-model.model";

@Injectable({
  providedIn: 'root'
})
export class CourrierService {

  API_URL_BASE = environment.apiUrl+'/courriers';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient : HttpClient) { }

  getAllCourriersFromServer() : Observable<any>{
    return this.httpClient.get(this.API_URL_BASE);
  }

  addNewCourrierToServer(nouveauCourrier : CourrierModel) : Observable<any>{
    return this.httpClient.post(this.API_URL_BASE, nouveauCourrier);
  }

  deleteCourrierFromServer(id : any) : Observable<any>{
    let delete_url = `${this.API_URL_BASE}/${id}`;
    return this.httpClient.delete(delete_url, {headers : this.httpHeaders})
  }

  getOneCourrierFromServer(id : any) : Observable<any>{
    let get_url = `${this.API_URL_BASE}/${id}`;
    return this.httpClient.get(get_url, {headers : this.httpHeaders});
  }

  //Update courriers from server
  updateCourrierFromServer(courrierModifier : CourrierModel, id : string) : Observable<any>{
    let get_url = `${this.API_URL_BASE}/${id}`;
    return this.httpClient.patch(get_url, courrierModifier, {headers : this.httpHeaders});
  }
}
